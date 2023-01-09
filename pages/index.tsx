import styled, { keyframes } from "styled-components";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { LoginResponse } from "../types/api/LoginResponse";
import { USER_TOKEN_COOKIE_KEY } from "../constants/userTokenCookieKey";

const Container = styled.form`
  margin: 0 1em;
  > * {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 360px;
    width: 100%;
  }
`;

const Title = styled.h4`
  font-size: 32px;
  font-weight: 500;
  text-align: center;
`;

const Code = styled.input`
  border: none;
  outline: none;
  background: #1c1c1e;
  color: #fff;
  display: block;
  font-size: 16px;
  border-radius: 10px;
  padding: 18px;
  ::placeholder {
    color: #4e4e50;
  }
  margin-bottom: 24px;
`;

const CodeError = styled.div`
  margin-top: -24px;
  > span {
    color: #db5267;
    font-size: 14px;
  }
`;

const buttonLoadingAnimation = keyframes`
  to { transform: rotate(360deg); }
`;

const NextButtonText = styled.span`
  transition: all 0.2s;
  color: #fff;
`;

const NextButton = styled.button`
  position: relative;
  background: #3478f5;
  text-transform: uppercase;
  font-weight: 500;
  height: 54px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 24px;
  &.loading {
    ${NextButtonText} {
      visibility: hidden;
      opacity: 0;
    }
    ::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 2px solid #fff;
      border-right-color: transparent;
      border-radius: 50%;
      animation: ${buttonLoadingAnimation} 0.7s linear infinite;
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <Container
      onSubmit={async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const {
          code: { value: code },
        } = form.elements as typeof form.elements & {
          code: HTMLInputElement;
        };
        setIsLoading(true);
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });
          const { status, data }: LoginResponse = await response.json();
          if (status === "Success" && data) {
            const { token, expirationTime } = data;
            Cookies.set(USER_TOKEN_COOKIE_KEY, token, {
              expires: new Date(expirationTime),
            });
            await router.push("/chat");
            setError("");
          } else if (status === "InvalidCredentials") {
            setError("Invalid credentials");
          } else {
            setError("Server error");
          }
        } catch (e) {
          setError("No Internet Connection");
        }
        setIsLoading(false);
      }}
    >
      <Title>Sign in</Title>
      <Code
        name="code"
        placeholder="Pass code"
        type="password"
        required
        onFocus={() => {
          setError("");
        }}
      />
      {error && (
        <CodeError>
          <span>{error}</span>
        </CodeError>
      )}
      <NextButton
        type="submit"
        className={isLoading ? "loading" : undefined}
        disabled={isLoading}
      >
        <NextButtonText>Next</NextButtonText>
      </NextButton>
    </Container>
  );
}
