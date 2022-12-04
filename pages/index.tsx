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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>sdfdf</Title>
        <Input/>
    </Container>
  )
}
