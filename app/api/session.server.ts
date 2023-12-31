import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "~/api/firebaseClient";
import type { LoginForm } from "~/types/interfaces";
import { destroySession, getSession } from "./sessions";

export async function authCreateAccountWithEmail({
  email,
  password,
}: LoginForm) {
  let user = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch(function (error): any {
      if (error.code == "auth/weak-password") {
        throw new Error(
          "Weak password, password must be at least 6 characters"
        );
      } else {
        throw new Error(error.message);
      }
    });

  return user;
}

export async function authSignInWithEmail({ email, password }: LoginForm) {
  let user = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => {
      if (error.code == "auth/invalid-login-credentials") {
        throw new Error("Invalid User Credentials");
      } else {
        throw new Error(error.message);
      }
    });
  return user;
}

let sessionSecret = "why is not reading from .env ";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

let storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  let session = await getUserSession(request);
  let userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  let session = await getUserSession(request);
  let userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  let userId = auth.currentUser?.email;
  if (typeof userId !== "string") {
    return null;
  }

  try {
    let user = auth.currentUser;
    onAuthStateChanged(auth, (user) => user);
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  return signOut(auth)
    .then(async () => {
      return redirect("/signin", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function createUserSession(
  userId: string | null,
  redirectTo: string
) {
  let session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
