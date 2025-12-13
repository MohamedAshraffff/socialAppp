import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Context/auth.context.jsx";
import { mode } from "../Context/theme.context.jsx";
import { getUserData } from "../Api/getUserData";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const { isLogin, setLogin } = useContext(auth);
  const { theme, toggleTheme } = useContext(mode);

  const navigate = useNavigate();
  function toggle() {
    setOpen(!isOpen);
  }
  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
    setLogin(null);
  }
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    refetchOnWindowFocus: false,
    // staleTime:4000 ,refetchInterval:10000
  });
  // console.log(data);
  //   if (isLoading)
  //   return (
  //     <div className="text-center">
  //       <div role="status">
  //         <svg
  //           aria-hidden="true"
  //           className="inline w-8 h-8 text-gray-200 animate-spin fill-purple-600"
  //           viewBox="0 0 100 101"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           {" "}
  //           <path
  //             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //             fill="currentColor"
  //           />
  //           <path
  //             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //             fill="currentFill"
  //           />
  //         </svg>
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // if (isError)
  //   return (
  //     <div className="flex justify-center items-center min-h-screen p-1">
  //       <div
  //         className="p-2  text-sm text-purple-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-purple-400 max-w-md"
  //         role="alert"
  //       >
  //         <span className="font-medium">Error!</span> Retry one more time!
  //       </div>
  //     </div>
  //   );
  // console.log(data?.user?.name);

  return (
    <nav className="bg-white border-gray-200 dark:bg-black w-full shadow ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/Home"} className="text-purple logo tracking-widest ">
          <h2 className="text-4xl">Social</h2>
        </Link>

        {/* Dark Mode & Profile - Always visible */}
        <div className="flex items-center gap-3 md:order-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <i className="fa-solid fa-moon text-purple-500 text-xl"></i>
            ) : (
              <i className="fa-solid fa-sun text-yellow-500 text-xl"></i>
            )}
          </button>

          {/* Profile - visible only when logged in */}
          {isLogin && (
            <Link to={`/profile/${data?.user?._id}`}>
              <img
                className="rounded-full w-10 h-10 object-cover border-2 border-purple-500"
                src={data?.user?.photo}
                alt="Profile"
              />
            </Link>
          )}

          {/* Burger Button for Mobile */}
          <button
            onClick={toggle}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Burger Menu Content */}
        <div
          className={`${
            !isOpen && "hidden"
          } w-full md:block md:w-auto md:order-1`}
          id="navbar-default"
        >
          <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-black">
            {isLogin ? (
              <>
                <li className="w-full md:w-auto">
                  <Link
                    to={"/home"}
                    className="flex items-center gap-3 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                      />
                    </svg>
                    <span className="md:hidden">Home</span>
                  </Link>
                </li>
                <li className="w-full md:w-auto">
                  <button
                    onClick={logOut}
                    className="flex items-center gap-3 w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                      />
                    </svg>
                    <span className="md:hidden">Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="w-full md:w-auto">
                  <Link to={"/"} className="block w-full">
                    <button
                      type="button"
                      className="w-full md:w-auto text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 shadow-md font-semibold rounded-lg text-sm px-5 py-2.5 transition-all duration-200 hover:shadow-lg"
                    >
                      Login
                    </button>
                  </Link>
                </li>
                <li className="w-full md:w-auto mt-2 md:mt-0">
                  <Link to={"/Register"} className="block w-full">
                    <button
                      type="button"
                      className="w-full md:w-auto text-purple-600 bg-white dark:bg-gray-800 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 focus:ring-4 focus:ring-purple-300 shadow-md font-semibold rounded-lg text-sm px-5 py-2.5 transition-all duration-200 hover:shadow-lg"
                    >
                      Register
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
