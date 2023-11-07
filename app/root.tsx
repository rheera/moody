import { type ActionFunctionArgs, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import stylesheet from "~/styles/tailwind.css";
import navStyleSheet from "~/styles/nav.css";
import { Nav } from "./components/Nav";
import { logout } from "./api/session.server";
import ErrorPage from "./components/ErrorPage";
import { ResponseError } from "./types/interfaces";

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
        <header>
          <Nav />
        </header>
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as ResponseError;
  console.log(error);

  // I should implment this utility function instead of casting as ResponseError

  // let errorMessage: string;

  // if (isRouteErrorResponse(error)) {
  //   errorMessage = error.data || error.statusText;
  // } else if (error instanceof Error) {
  //   errorMessage = error.message;
  // } else if (typeof error === "string") {
  //   errorMessage = error;
  // } else {
  //   errorMessage = "Unknown error";
  // }
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Nav />
        </header>
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
          <ErrorPage error={error} />
        </main>
        <Scripts />
      </body>
    </html>
  );
}
