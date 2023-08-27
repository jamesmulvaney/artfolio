import {
  useCurrentUserQuery,
  useGetSettingsPageInfoQuery,
} from "@/codegen/graphql";
import Layout from "@/components/general/Layout";
import InfoBox from "@/components/settings/InfoBox";
import { withApollo } from "@/utils/withApollo";
import dayjs from "dayjs";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import SettingsModalWrapper from "@/components/settings/SettingsModalWrapper";
import ChangeUsernameForm from "@/components/forms/ChangeUsernameForm";
import { useRouter } from "next/router";
import ChangeEmailForm from "@/components/forms/ChangeEmailForm";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import SettingsLoadingSkeleton from "@/components/settings/loading/SettingsLoadingSkeleton";

type SettingsPageProps = {};

function SettingsPage({}: SettingsPageProps) {
  const router = useRouter();

  const { data: settingsData, loading: settingsLoading } =
    useGetSettingsPageInfoQuery();

  if (settingsLoading) {
    return (
      <Layout>
        <Head>
          <title>Settings | Artfolio</title>
        </Head>
        <SettingsLoadingSkeleton />
      </Layout>
    );
  }

  if (!settingsLoading && !settingsData?.currentUser) {
    router.push("/");
    return (
      <>
        <Head>
          <title>Settings | Artfolio</title>
        </Head>
        <Layout>
          <div className="text-center mt-10">
            <h1 className="font-semibold text-2xl">Authentication Error...</h1>
            <p className="text-md">You must be logged in to see this page!</p>
          </div>
        </Layout>
      </>
    );
  }
  const fromSettingsInfo = settingsData?.currentUser;

  return (
    <>
      <Head>
        <title>Settings | Artfolio</title>
      </Head>
      <Layout>
        <div className="mt-5 md:flex md:justify-center">
          <div className="flex flex-col justify-center items-center md:container md:flex-none md:justify-normal md:items-start">
            <h1 className="text-5xl font-semibold mb-5">Settings</h1>
            <h2 className="text-2xl">Account Information</h2>
            <p className="italic mb-3">
              Various information about your account.
            </p>
            <InfoBox>
              <p className="font-semibold">
                Display Name:{" "}
                <span className="font-light text-black/90 dark:text-white/90">
                  {fromSettingsInfo?.displayName}
                </span>
              </p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold">
                Username:{" "}
                <span className="font-light text-black/90 dark:text-white/90">
                  {fromSettingsInfo?.username}
                </span>
              </p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold">
                E-mail:{" "}
                <span className="font-light text-black/90 dark:text-white/90">
                  {fromSettingsInfo?.email}
                </span>
              </p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold">
                Account Created:{" "}
                <span className="font-light text-black/90 dark:text-white/90">
                  {dayjs(parseInt(fromSettingsInfo?.createdAt!)).format(
                    "YYYY/MM/DD HH:mm:ss"
                  )}
                </span>
              </p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold">
                Post Count:{" "}
                <span className="font-light text-black/95 dark:text-white/95">
                  {fromSettingsInfo?.postCount}
                </span>
              </p>
            </InfoBox>
            <h2 className="text-2xl mb-3 mt-5">Options</h2>
            <Link
              href="/settings?changeUsername=1"
              role="button"
              className="inline-flex items-center px-3 py-2 mb-2 rounded text-sm font-semibold bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-600 hover:shadow-sm focus:ring-2 focus:ring-yellow-400 focus:dark:ring-yellow-800 transition duration-300"
            >
              <FaPencilAlt className="mr-2" /> Change Username
            </Link>
            <Link
              href="/settings?changeEmail=1"
              role="button"
              className="inline-flex items-center px-3 py-2 mb-2 rounded text-sm font-semibold bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-600 hover:shadow-sm focus:ring-2 focus:ring-yellow-400 focus:dark:ring-yellow-800 transition duration-300"
            >
              <FaPencilAlt className="mr-2" /> Change Email
            </Link>
            <Link
              href="/settings?changePassword=1"
              role="button"
              className="inline-flex items-center px-3 py-2 mb-2 rounded text-sm font-semibold bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-600 hover:shadow-sm focus:ring-2 focus:ring-yellow-400 focus:dark:ring-yellow-800 transition duration-300"
            >
              <FaPencilAlt className="mr-2" /> Change Password
            </Link>
          </div>
        </div>
      </Layout>
      <SettingsModalWrapper
        query={router.query.changeUsername}
        redirectTo="/settings"
        title="Changing your username..."
      >
        <ChangeUsernameForm username={fromSettingsInfo?.username!} />
      </SettingsModalWrapper>
      <SettingsModalWrapper
        query={router.query.changeEmail}
        redirectTo="/settings"
        title="Changing your email..."
      >
        <ChangeEmailForm email={fromSettingsInfo?.email!} />
      </SettingsModalWrapper>
      <SettingsModalWrapper
        query={router.query.changePassword}
        redirectTo="/settings"
        title="Changing your password..."
      >
        <ChangePasswordForm />
      </SettingsModalWrapper>
    </>
  );
}

export default withApollo({ ssr: false })(SettingsPage);
