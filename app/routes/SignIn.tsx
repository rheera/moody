import {
  type MetaFunction,
  type LinksFunction,
  type ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import stylesheet from "~/styles/logout.css";
import googleLogo from "../assets/images/google.png";

import {
  authCreateAccountWithEmail,
  authSignInWithEmail,
} from "~/api/session.server";
import { commitSession, getSession } from "~/api/sessions";

import { LoginOptions } from "~/types/enums";
import type { LoginForm, SignUpFormData } from "~/types/interfaces";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign In" },
    { name: "Sign In or Up page", content: "Sign in or sign up for Moody" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();
  const {
    email,
    password,
    _action: submitType,
  }: SignUpFormData = Object.fromEntries(formData);

  /**
   * TODO: refactor this code so it's cleaner
   * if and else both shouldn't have a const user
   * should be const user = if(signup) else(signin)
   * need to return redirect to login page with Set-Cookie headers as per remix sessions doc
   */
  if (submitType === LoginOptions.SIGN_UP) {
    const user = await authCreateAccountWithEmail({
      email,
      password,
    } as LoginForm)
      .then(async (data) => {
        session.set("userId", data.uid);
        return redirect("/", {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        });
      })
      .catch((e) => {
        return e.message;
      });
    return user;
  } else {
    const user = await authSignInWithEmail({
      email,
      password,
    } as LoginForm)
      .then(async (data) => {
        session.set("userId", data.uid);
        return redirect("/", {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        });
      })
      .catch((e) => {
        session.flash("error", "Invalid username/password");
        return e.message;
      });

    return user;
  }
};
export default function SignIn() {
  const errorMessage = useActionData() as string;

  return (
    <section id="logged-out-view">
      <div className="container">
        <h1 className="app-title">Moody</h1>
        {errorMessage && (
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
            role="alert"
          >
            <p className="font-bold">Uh Oh!</p>
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="provider-buttons">
          <button
            id="sign-in-with-google-btn"
            className="provider-btn logout-button"
          >
            <img
              src={googleLogo}
              className="google-btn-logo"
              alt="Google Logo"
            />
            Sign in with Google
          </button>
        </div>

        <Form id="login-form" method="post" className="auth-fields-and-buttons">
          <input
            id="email-input"
            aria-label="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            id="password-input"
            aria-label="password"
            name="password"
            type="password"
            placeholder="Password"
          />

          <button
            type="submit"
            name="_action"
            value={LoginOptions.SIGN_IN}
            id="sign-in-btn"
            className="primary-btn logout-button"
          >
            Sign in
          </button>
          <button
            type="submit"
            name="_action"
            value={LoginOptions.SIGN_UP}
            id="create-account-btn"
            className="secondary-btn logout-button"
          >
            Create Account
          </button>
        </Form>
      </div>
    </section>
  );
}
