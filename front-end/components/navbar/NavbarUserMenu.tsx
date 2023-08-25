import { Menu, Transition } from "@headlessui/react";
import {
  FaChevronDown,
  FaUser,
  FaCogs,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";
import { useApolloClient } from "@apollo/client";
import Image from "next/image";
import React, { Fragment } from "react";
import { useLogoutMutation } from "@/codegen/graphql";
import Link from "next/link";

type NavbarUserMenuProps = {
  avatar: string;
  displayName: string;
  username: string;
};

function NavbarUserMenu({
  avatar,
  displayName,
  username,
}: NavbarUserMenuProps) {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  return (
    <Menu as="div" className="relative z-10">
      <div>
        <Menu.Button className="flex flex-row space-x-2 items-center">
          <Image
            src={avatar}
            alt={`${displayName}'s Avatar`}
            height={32}
            width={32}
            className="rounded-full bg-gray-700"
          />
          <div className="hidden sm:flex sm:flex-col sm:space-y-1 sm:items-start ">
            <p className="text-lg font-semibold leading-3">{displayName}</p>
            <p className="text-sm font-light text-black/75 dark:text-white/75 leading-3">
              @{username}
            </p>
          </div>
          <FaChevronDown className="hidden sm:block" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-300/50 dark:divide-zinc-600 rounded border bg-white dark:bg-zinc-700 dark:border-zinc-600">
          <div className="py-1 sm:hidden">
            <Menu.Item>
              <div className="flex flex-col w-full p-2">
                <p className="text-xs text-white/80 font-medium">
                  Signed in as:
                </p>
                <p className="text-sm font-medium">{displayName}</p>
              </div>
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/p/${username}`}
                  className={`${
                    active ? "bg-zinc-50 dark:bg-zinc-600" : ""
                  } group flex w-full items-center p-2 text-sm font-medium`}
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/settings`}
                  className={`${
                    active ? "bg-zinc-50 dark:bg-zinc-600" : ""
                  } group flex w-full items-center p-2 text-sm font-medium`}
                >
                  <FaCogs className="mr-2" />
                  Settings
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={async () => {
                    await logout();
                    await apolloClient.resetStore();
                  }}
                  className={`${
                    active ? "bg-zinc-50 dark:bg-zinc-600" : ""
                  } group flex w-full items-center p-2 text-sm font-medium`}
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default NavbarUserMenu;
