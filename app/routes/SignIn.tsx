import {
  type MetaFunction,
  type LinksFunction,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form } from "@remix-run/react";

import stylesheet from "~/styles/logout.css";
import googleLogo from "../assets/images/google.png";

import {
  authCreateAccountWithEmail,
  authSignInWithEmail,
  createUserSession,
} from "~/api/session.server";

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const {
    email,
    password,
    _action: submitType,
  }: SignUpFormData = Object.fromEntries(formData);

  if (submitType === LoginOptions.SIGN_UP) {
    const user = await authCreateAccountWithEmail({
      email,
      password,
    } as LoginForm);
    console.log(user);

    return redirect("/");
    // const token = await user.getIdToken();
    // return createUserSession(token, "/");
  } else {
    const { user } = await authSignInWithEmail({
      email,
      password,
    } as LoginForm);
    const token = await user.getIdToken();
    return createUserSession(token, "/");
  }
};
export default function SignIn() {
  return (
    <section id="logged-out-view">
      <div className="container">
        <h1 className="app-title">Moody</h1>

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
