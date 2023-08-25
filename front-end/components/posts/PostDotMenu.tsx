import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

type PostDotMenuProps = {};

function PostDotMenu({}: PostDotMenuProps) {
  return (
    <Menu as="div" className="relative z-10">
      <div>
        <Menu.Button className="flex flex-row space-x-2 items-center">
          <button
            type="button"
            className="px-2 py-2 rounded text-base hover:dark:bg-zinc-950 hover:shadow-sm focus:ring-2 focus:ring-blue-400 focus:dark:ring-blue-800 transition duration-300"
          >
            <HiDotsHorizontal />
          </button>
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
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-zinc-300/50 dark:divide-zinc-600 rounded border bg-white dark:bg-zinc-700 dark:border-zinc-600">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active ? "bg-zinc-50 dark:bg-zinc-600" : ""
                  } group flex w-full items-center p-2 text-sm font-medium justify-center`}
                >
                  Lock
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href={`#`}
                  className={`${
                    active ? "bg-zinc-50 dark:bg-zinc-600" : ""
                  } group inline-flex w-full items-center p-2 text-sm font-medium justify-center`}
                >
                  Delete
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default PostDotMenu;
