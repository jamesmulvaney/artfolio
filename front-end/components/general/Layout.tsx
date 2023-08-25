import React from "react";
import Navbar from "../navbar/Navbar";
import Head from "next/head";

type LayoutProps = {
  children: any;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_SITE_URL}
          key="ogurl"
        />
        <meta
          property="og:image"
          content="https://i.imgur.com/hrXmYl4.png"
          key="ogimage"
        />
        <meta property="og:title" content={`Artfolio Home`} key="ogtitle" />
      </Head>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
