import React, { useRef, useState, useEffect, useCallback } from "react";
import FooterSmall from "components/UI/FooterSmall";
import Layout from "components/UI/Layout";
import Navbar from "components/UI/Navbar";
import Image from "next/image";
import Link from "next/link";
import Button from "components/UI/Button";
import { toast, Toaster } from "react-hot-toast";
import { useCurrentUser } from "@/lib/user";
import { fetcher } from "@/lib/fetch";
import { useRouter } from "next/router";

interface SignInProps {}

const SignIn: React.FunctionComponent<SignInProps> = (props) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  const router = useRouter();

  useEffect(() => {
    if (isValidating) return;
    if (user) router.replace("/dashboard");
  }, [user, router, isValidating]);

  const submitHandler = useCallback(
    async (event: any) => {
      event.preventDefault();
      setIsLoading(true);

      let userData = {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      };

      try {
        const response = await fetcher("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        console.log("@response", response);

        if (response.success) {
          toast.success("You have been logged in.");
          mutate({ user: response.data }, false);
        } else {
          toast.error("Invalid Email or Password!");
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },

    [mutate]
  );

  return (
    <Layout title="Sign-In">
      <Toaster />
      <Navbar transparent />
      <main>
        <section className="absolute w-full h-full">
          <div style={{ width: "100%", height: "100%", position: "fixed" }}>
            <Image
              src="/assets/img/register_bg_2.png"
              alt="..."
              className="absolute top-0 w-full h-full bg-gray-900"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <Image
                          src="/assets/svg/github.svg"
                          alt="..."
                          className="w-5 mr-1"
                          width={20}
                          height={20}
                        />
                        Github
                      </button>
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <Image
                          src="/assets/svg/google.svg"
                          alt="..."
                          className="w-5 mr-1"
                          width={20}
                          height={20}
                        />
                        Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or sign in with credentials</small>
                    </div>
                    <form onSubmit={submitHandler}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          ref={emailRef}
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          ref={passwordRef}
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <Button black loading={isLoading}>
                          Sign Up
                        </Button>
                      </div>

                      <div className="cursor-pointer text-center">
                        <Link href="/sign-up">
                          <small>Don&apos;t have an account? Sign Up</small>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall />
        </section>
      </main>
    </Layout>
  );
};

export default SignIn;
