import { Outlet } from "react-router-dom";
// import "../styles/Layout.css";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export default function Layout() {
  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    const handleNetworkChange = () => {
      window.location.reload(); // Reload the page when network changes
    };
    window.ethereum && window.ethereum.on("chainChanged", handleNetworkChange);
    return () => {
      // Clean up event listeners
      window.ethereum && window.ethereum.removeListener("chainChanged", handleNetworkChange);
    };
  }, []);
  return (
    <>
      {isLoading && <Loader />}

      <Header />
      <main className="mt-3 px-4">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
