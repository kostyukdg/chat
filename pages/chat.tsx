import styled from "styled-components";
import Input from "../components/Input";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: block;
  position: relative;
`;

export default function Chat() {
  return (
    <Container>
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
