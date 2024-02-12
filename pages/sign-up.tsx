import React, { useRef, useCallback, useState } from "react";
import FooterSmall from "components/UI/FooterSmall";
import Layout from "components/UI/Layout";
import Navbar from "components/UI/Navbar";
import Button from "components/UI/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetcher } from "@/lib/fetch";
import {toast,Toaster} from "react-hot-toast";
import {useCurrentUser} from "@/lib/user"

interface SignUpProps {}

const SignUp: React.FunctionComponent<SignUpProps> = (props) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { mutate } = useCurrentUser();

  const submitHandler = useCallback(async (event: any) => {
    event.preventDefault();
    setIsLoading(true);


    try {
      
      let userData = {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
        name: nameRef?.current?.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      if (userData.password !== confirmPasswordRef?.current?.value) {
        toast.error("Password don't match!");
        return;
      }
      const response = await fetcher("/api/users", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.success) {
        mutate({ user: response.data }, false);
        toast.success(response.message);
        router.replace('/dashboard');
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
    
  }, [mutate, router]);

  return (
    <Layout title="Sign-Up">
      <Toaster/>
      <Navbar transparent />
      <main>
        <section className="absolute w-full h-full ">
          <div style={{ width: "100%", height: "100%", position: "fixed" }}>
            <Image
              src="/assets/img/register_bg_2.png"
              alt="..."
              className="absolute top-0 w-full h-full bg-gray-900"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="container mx-auto px-4 mt-10 h-full bg-yellow-700 ">
            <div className="flex content-center items-center justify-center h-full bg-blue-700 ">
              <div className="w-full lg:w-4/12 px-4 ">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-0">
                      <h6 className="text-gray-600 text-xl font-bold">
                        Join Now
                      </h6>
                    </div>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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

                      <div className="relative w-full mb-1">
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

                      <div className="relative w-full mb-1">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          ref={confirmPasswordRef}
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <hr className="mt-6 border-b-1 mb-5 border-gray-400" />

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Name
                        </label>
                        <input
                          ref={nameRef}
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Name"
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
                        <Link href="/sign-in">
                          <small>Already have an account? Sign In</small>
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

export default SignUp;
