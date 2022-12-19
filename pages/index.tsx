import Head from 'next/head'
import styled from "styled-components";
import Input from "../components/Input";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: #010101;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
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
        <title>MK App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="Love" />
        <meta name="application-name" content="Love" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Title>sdfdf</Title>
        <Input/>
    </Container>
  )
}
