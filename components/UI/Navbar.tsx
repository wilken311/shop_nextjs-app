import React, { ReactElement, useState } from "react";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/lib/user";

interface INavbarProps {
  transparent?: boolean;
  title?: string,
}

const Navbar: React.FunctionComponent<INavbarProps> = ({title,transparent}): ReactElement => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter().asPath;

  const { data: { user } = {}, } = useCurrentUser();

  const adminPanelNavBar = () => {
      return <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-black font-bold font text-lg uppercase hidden lg:inline-block"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {title}
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  }

  const defaultNavBar = () => {
      return  <>
      <nav
        className={
          (transparent
            ? "top-0 absolute z-50 w-full"
            : "relative bg-white shadow-lg") +
          " flex flex-wrap items-center justify-between px-2 py-3 "
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className={
                  (transparent ? "text-white" : "text-gray-800") +
                  " title-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                }
                href=""
              >
                Tailwind Starter Kit
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (transparent ? "text-white" : "text-gray-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className={
                    (transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/landing"
                >
                  <i
                    className={
                      (transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " far fa-file-alt text-lg leading-lg mr-2"
                    }
                  />{" "}
                  Docs
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className={
                    (transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  href="#pablo"
                >

                  <span className="lg:hidden inline-block ml-2">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className={
                    (transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  href="#pablo"
                >
                  <i
                    className={
                      (transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " fab fa-twitter text-lg leading-lg "
                    }
                  />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className={
                    (transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  href="#pablo"
                >
                  <i
                    className={
                      (transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " fab fa-github text-lg leading-lg "
                    }
                  />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </a>
              </li>
              
              {/* checks user login. */}
              {user!=null?
              <>
                <li className="flex items-center">
                  <Link href="/dashboard">
                    <button
                      className={
                        (transparent
                          ? "bg-white text-gray-800 active:bg-gray-100"
                          : "bg-pink-500 text-white active:bg-pink-600") +
                        " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                      }
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Dashboard
                    </button>
                  </Link>
                </li>
              </>
              :
              <>
               <li className="flex items-center">
                  <Link href="/sign-in">
                    <button
                      className={
                        (transparent
                          ? "bg-white text-gray-800 active:bg-gray-100"
                          : "bg-pink-500 text-white active:bg-pink-600") +
                        " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                      }
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Log In
                    </button>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link href="/sign-up">
                    <button
                      className={
                        (transparent
                          ? "bg-white text-gray-800 active:bg-gray-100"
                          : "bg-pink-500 text-white active:bg-pink-600") +
                        " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                      }
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Sign Up
                    </button>
                  </Link>
                </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  }


  if (router === "/" || router === "/sign-in" || router === "/sign-up") {
    return defaultNavBar();
  } else {
    return adminPanelNavBar();
  }

};

export default Navbar;
