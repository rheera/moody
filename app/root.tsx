import { type ActionFunctionArgs, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/styles/tailwind.css";
import navStyleSheet from "~/styles/nav.css";
import { Nav } from "./components/Nav";
import { logout } from "./api/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },

  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Calistoga&display=swap",
  },
  { rel: "stylesheet", href: navStyleSheet },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await logout(request);
  } catch (error) {
    return error;
  }
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
