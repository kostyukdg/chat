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
