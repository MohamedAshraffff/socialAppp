import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <section className="bg-gray-50 dark:bg-black min-h-screen flex items-center justify-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-purple-600 dark:text-purple-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-purple-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.
            </p>
            <Link
              to={"/home"}
              className="inline-flex text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-purple-900 my-4 transition-all duration-200"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
