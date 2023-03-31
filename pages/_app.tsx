import type { AppProps } from "next/app";
import "../styles/global.css";
import { AppStateProvider } from "../context/AppStateContext";
// import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  );
}
export default MyApp;
