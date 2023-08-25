import { useCurrentUserQuery } from "@/codegen/graphql";
import Link from "next/link";
import React from "react";
import NavbarUserMenu from "./NavbarUserMenu";
import SearchForm from "../forms/SearchForm";

type NavbarProps = {};

function Navbar({}: NavbarProps) {
  const { data, loading } = useCurrentUserQuery();

  let userInfoOrSignin = (
    <Link
      href="/login"
      className="px-3 py-2 rounded text-sm font-semibold bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 hover:shadow-sm focus:ring-2 focus:ring-blue-400 focus:dark:ring-blue-800 transition duration-300"
    >
      Sign In
    </Link>
  );

  if (loading) {
    //Loading State
  } else if (!loading && data?.currentUser) {
    userInfoOrSignin = (
      <>
        <SearchForm />
        <div className="flex flex-row space-x-5">
          <NavbarUserMenu
            avatar={data.currentUser.avatar}
            displayName={data.currentUser.displayName}
            username={data.currentUser.username}
          />
        </div>
      </>
    );
  }

  return (
    <header>
      <div className="flex flex-col items-center px-10 py-4 border-b border-zinc-300/50 dark:border-white/20 bg-zinc-50 dark:bg-zinc-800">
        <div className="container flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            ARTFOLIO
          </Link>
          {userInfoOrSignin}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
