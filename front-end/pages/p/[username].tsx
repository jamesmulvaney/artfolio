import { useGetUserProfileQuery } from "@/codegen/graphql";
import Layout from "@/components/general/Layout";
import LoadingSkeleton from "@/components/userProfile/LoadingSkeleton";
import PostGrid from "@/components/userProfile/PostGrid";
import ProfileBit from "@/components/userProfile/ProfileBit";
import { withApollo } from "@/utils/withApollo";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

type ProfilePageProps = {};

function ProfilePage({}: ProfilePageProps) {
  const router = useRouter();
  const username = (router.query.username as string) || "";
  const { data, loading } = useGetUserProfileQuery({ variables: { username } });

  if (loading) {
    return (
      <>
        <Head>
          <title>Profile | Artfolio</title>
        </Head>
        <Layout>
          <LoadingSkeleton />
        </Layout>
      </>
    );
  } else if (!loading && !data?.userByUsername) {
    return (
      <>
        <Head>
          <title>Profile | Artfolio</title>
        </Head>
        <Layout>
          <div className="text-center mt-10">
            <h1 className="font-semibold text-2xl">User not found...</h1>
            <p className="text-md">
              Double check that you entered the correct username!
            </p>
          </div>
        </Layout>
      </>
    );
  }

  const user = data?.userByUsername!;
  const pageTitle = user?.displayName
    ? `${user?.displayName} | Artfolio`
    : "Profile | Artfolio";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          property="og:title"
          content={`${user.displayName} @Artfolio`}
          key="ogtitle"
        />
      </Head>
      <Layout>
        <div className="flex justify-center sm:mt-5">
          <div className="container">
            <ProfileBit
              avatar={user?.avatar!}
              banner={user?.banner!}
              bio={user?.bio!}
              displayName={user?.displayName!}
              followerCount={user?.followerCount!}
              followingCount={user?.followingCount!}
              username={user?.username!}
              id={user?.id!}
            />
            <div className="mt-5 sm:mt-10 mb-10">
              {user?.posts?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  <PostGrid posts={user.posts} username={username} />
                </div>
              ) : (
                <div className="text-center">
                  <h1 className="font-semibold text-2xl">
                    {user?.displayName} has no posts...
                  </h1>
                  <p className="text-md">
                    Check back soon to see if they have uploaded some!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default withApollo({ ssr: true })(ProfilePage);
