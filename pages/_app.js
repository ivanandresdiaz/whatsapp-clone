import { AuthProvider } from "../Auth";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import "../styles/globals.css";
// import Login from "./login";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
