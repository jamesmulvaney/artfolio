import { useCurrentUserQuery } from "@/codegen/graphql";
import Layout from "@/components/general/Layout";
import IndexFollowingWall from "@/components/index/IndexFollowingWall";
import IndexNoAuth from "@/components/index/IndexNoAuth";
import { withApollo } from "@/utils/withApollo";
import Head from "next/head";

const Home = () => {
  const { data, loading } = useCurrentUserQuery();
  let page;

  if (loading) {
    page = <div></div>;
  }

  if (!loading && !data?.currentUser) {
    page = <IndexNoAuth />;
  }

  return (
    <>
      <Head>
        <title>Artfolio</title>
      </Head>
      <Layout>{data?.currentUser ? <IndexFollowingWall /> : page}</Layout>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
