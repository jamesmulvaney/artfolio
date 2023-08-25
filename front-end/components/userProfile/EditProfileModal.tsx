import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { HiX } from "react-icons/hi";
import EditProfileForm from "../forms/EditProfileForm";

type EditProfileModalProps = {
  avatar: string;
  banner: string;
  bio: string;
  displayName: string;
  username: string;
};

function EditProfileModal({
  avatar,
  banner,
  bio,
  displayName,
  username,
}: EditProfileModalProps) {
  const router = useRouter();

  const onClose = () => {
    router.push(`/p/${username}`, undefined, {
      scroll: false,
    });
  };

  return (
    <Transition appear show={!!router.query.editProfile} as={Fragment}>
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
                  <HiX />
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
              <Dialog.Panel className="min-w-[350px] sm:min-w-[500px]">
                <div className="dark:bg-zinc-800 rounded py-5 divide-y divide-zinc-300/50 dark:divide-white/20">
                  <h1 className="font-semibold text-xl text-center mb-3 px-5">
                    Editing your profile...
                  </h1>
                  <div className="pt-3 px-5">
                    <EditProfileForm
                      avatar={avatar}
                      banner={banner}
                      bio={bio}
                      displayName={displayName}
                      username={username}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default EditProfileModal;
