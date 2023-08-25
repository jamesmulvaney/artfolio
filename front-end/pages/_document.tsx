import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="text-black dark:text-white dark:bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
