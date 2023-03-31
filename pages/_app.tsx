import type { AppProps } from "next/app";
import "../styles/global.css";
import { AppStateProvider } from "../context/AppStateContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AppStateProvider>
  );
}
export default MyApp;
