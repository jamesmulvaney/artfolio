import LoginForm from "@/components/forms/LoginForm";
import Layout from "@/components/general/Layout";
import { withApollo } from "@/utils/withApollo";
import Link from "next/link";
import React from "react";

type LoginPageProps = {};

function LoginPage({}: LoginPageProps) {
  return (
    <Layout>
      <div className="max-w-xl flex flex-col justify-center sm:py-12 mx-auto">
        <div className="min-w-full p-9 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-4xl mb-1 dark:text-zinc-100">
            Sign in with your account...
          </h1>
          <p className="font-light text-center text-xl mb-2 dark:text-zinc-100">
            and start sharing your art with others!
          </p>
          <p className="font-light text-center text-lg mb-2 dark:text-zinc-100/75">
            Dont have an account?{" "}
            <Link href="/register" className="font-semibold">
              Click here
            </Link>{" "}
            to register.
          </p>
          <div className="bg-gray-50 dark:bg-zinc-800 shadow w-full rounded">
            <div className="px-5 py-7">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withApollo({ ssr: true })(LoginPage);
