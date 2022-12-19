import type { AppProps } from 'next/app'
import { Open_Sans } from '@next/font/google'
import { useEffect } from "react";

const openSans = Open_Sans({ subsets: ['latin', 'cyrillic'] })

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }, []);
  return <>
    <style jsx global>{`
        html {
          font-family: ${openSans.style.fontFamily};
        }
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    <Component {...pageProps} />
  </>
}
