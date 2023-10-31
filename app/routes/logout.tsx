import type { MetaFunction, LinksFunction } from "@remix-run/node";
import stylesheet from "~/styles/logout.css";
import googleLogo from "../assets/google.png";

export const meta: MetaFunction = () => {
  return [
    { title: "Logout" },
    { name: "Logout page", content: "Logging out of Moody" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

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

        <div className="auth-fields-and-buttons">
          <input id="email-input" type="email" placeholder="Email" />
          <input id="password-input" type="password" placeholder="Password" />

          <button id="sign-in-btn" className="primary-btn">
            Sign in
          </button>
          <button id="create-account-btn" className="secondary-btn">
            Create Account
          </button>
        </div>
      </div>
    </section>
  );
}
