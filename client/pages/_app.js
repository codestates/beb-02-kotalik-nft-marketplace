import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header style={{ position: "fixed" }} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
