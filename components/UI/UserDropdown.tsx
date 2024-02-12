import React, { ReactElement, useState, useCallback } from "react";
import Image from "next/image";
import { createPopper } from "@popperjs/core";
import Link from "next/link";
import toast from 'react-hot-toast';
import { useCurrentUser } from '@/lib/user';
import { fetcher } from "@/lib/fetch";
import { useRouter } from "next/router";

interface IUserDropdownProps {}

const UserDropdown: React.FunctionComponent<IUserDropdownProps> = (
  props
): ReactElement => {

  const router = useRouter();
  const { data: { user } = {}, mutate } = useCurrentUser();

  const submitHandler = useCallback (async (event: any) =>{
    try {
      await fetcher('/api/auth', {
        method: 'DELETE',
      });
      toast.success('You have been signed out');
      mutate({ user: null });
      router.replace('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  },[mutate]);

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <Image
              src="/assets/img/team-1-800x800.jpg"
              alt="Landscape picture"
              className="shadow-lg rounded-full max-w-full mx-auto"
              width={100}
              height={100}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
      
          <a
            className={
              "cursor-pointer text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={submitHandler}
          >
            Sign Out
          </a>
       
      </div>
    </>
  );
};

export default UserDropdown;
