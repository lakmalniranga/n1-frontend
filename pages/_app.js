import Router from "next/router";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
