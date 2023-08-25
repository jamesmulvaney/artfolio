import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiX } from "react-icons/hi";
import PostModalBody from "./PostModalBody";
import { useRouter } from "next/router";

type PostModalProps = {
  returnHref: string;
};

function PostModal({ returnHref }: PostModalProps) {
  const router = useRouter();

  const onClose = () => {
    router.push(returnHref, undefined, {
      scroll: false,
    });
  };

  return (
    <Transition appear show={!!router.query.postId} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute top-0 right-0 z-20">
              <div className="p-5">
                <button type="button" className="text-2xl" onClick={onClose}>
                  <HiX className="text-white" />
                </button>
              </div>
            </div>
          </Transition.Child>
          <div className="flex min-h-screen items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="max-w-[90vw] lg:max-w-[95vw]">
                {router.query.postId ? (
                  <PostModalBody
                    postId={parseInt(router.query.postId as string)}
                  />
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PostModal;
