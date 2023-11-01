import type {
  MetaFunction,
  LinksFunction,
  ActionFunctionArgs,
} from "@remix-run/node";
import stylesheet from "~/styles/logout.css";
import googleLogo from "../assets/google.png";
import { authCreateAccountWithEmail } from "~/api/firebase";
import { Form } from "@remix-run/react";
import { LoginOptions } from "~/types/enums";
import type { SignUpFormData } from "~/types/interfaces";

export const meta: MetaFunction = () => {
  return [
    { title: "Logout" },
    { name: "Logout page", content: "Logging out of Moody" },
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
    authCreateAccountWithEmail(email as string, password as string);
  } else {
    console.log("LoggedIn");
  }
  return null;
};
export default function Index() {
  return (
    <section id="logged-out-view">
      <div className="container">
        <h1 className="app-title">Moody</h1>

        <div className="provider-buttons">
          <button id="sign-in-with-google-btn" className="provider-btn">
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
            className="primary-btn"
          >
            Sign in
          </button>
          <button
            type="submit"
            name="_action"
            value={LoginOptions.SIGN_UP}
            id="create-account-btn"
            className="secondary-btn"
          >
            Create Account
          </button>
        </Form>
      </div>
    </section>
  );
}
