import Head from "next/head";
import styled from "styled-components";
import Input from "../components/Input";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #010101;
  display: block;
  position: relative;
`;

const Title = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 20px;
  width: 100%;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE || "Chat App"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta
          name="apple-mobile-web-app-title"
          content={process.env.NEXT_PUBLIC_APP_NAME || "Chat App"}
        />
        <meta
          name="application-name"
          content={process.env.NEXT_PUBLIC_APP_NAME || "Chat App"}
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#010101" />
      </Head>
      <Title>sdfdf</Title>
      <Input
        sendMessage={(message, attachment) => {
          const formData = new FormData();
          formData.append("message", message);
          if (attachment) formData.append("attachment", attachment);
          fetch("/api/message", {
            method: "POST",
            body: formData,
          });
        }}
      />
    </Container>
  );
}
