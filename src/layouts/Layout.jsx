import { Outlet } from "react-router-dom";
// import "../styles/Layout.css";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import { Suspense } from "react";
import { useSelector } from "react-redux";

export default function Layout() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  return (
    <>
      {isLoading && <Loader />}

      <Header />
      <main className="mt-3">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
