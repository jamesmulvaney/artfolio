import RegisterForm from "@/components/forms/RegisterForm";
import Layout from "@/components/general/Layout";
import { withApollo } from "@/utils/withApollo";
import Head from "next/head";
import Link from "next/link";
import React from "react";

type RegisterPageProps = {};

function RegisterPage({}: RegisterPageProps) {
  return (
    <>
      <Head>
        <title>Register | Artfolio</title>
      </Head>
      <Layout>
        <div className="max-w-2xl flex flex-col justify-center sm:py-12 mx-auto">
          <div className="min-w-full p-9 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="font-bold text-center text-4xl mb-1 dark:text-zinc-100">
              Create an Artfolio account...
            </h1>
            <p className="font-light text-center text-xl mb-2 dark:text-zinc-100">
              and start sharing your art with others!
            </p>
            <p className="font-light text-center text-lg mb-2 dark:text-zinc-100/75">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold">
                Click here
              </Link>{" "}
              to login.
            </p>
            <div className="bg-gray-50 dark:bg-zinc-800 shadow w-full rounded">
              <div className="px-5 py-7">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default withApollo({ ssr: true })(RegisterPage);
