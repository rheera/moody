import { Link } from "@remix-run/react";
import type { ResponseError } from "~/types/interfaces";

export default function ErrorPage({ error }: { error: ResponseError }) {
  return (
    <>
      <div className="flex flex-shrink-0 justify-center mt-40">
        <Link to="/" className="inline-flex">
          <span className="sr-only">Moody</span>
          <Link to="/" className="app-title text-4xl text-gray-900">
            Moody
          </Link>
        </Link>
      </div>
      <div className="py-16">
        <div className="text-center">
          {error.status && (
            <p className="text-base font-semibold text-indigo-600">
              {error.status}
            </p>
          )}
          {error.statusText && (
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {error.statusText}
            </h1>
          )}
          <p className="mt-2 text-base text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          {error.data && (
            <p className="mt-2 text-base text-gray-500">{error.data}</p>
          )}
          <div className="mt-6">
            <Link
              to="/"
              className="group text-base font-medium text-indigo-600 hover:text-indigo-500"
            >
              Go back home
              <span
                aria-hidden="true"
                className="ml-1 absolute group-hover:translate-x-1 transition-transform"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
