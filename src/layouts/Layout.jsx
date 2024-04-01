import { Outlet } from "react-router-dom";
// import "../styles/Layout.css";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import { Suspense } from "react";

export default function Layout() {
  return (
    <>
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
