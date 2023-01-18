import { Outlet } from "react-router-dom";
import Footer from "../ui/footer";
import Header from "../ui/header";
import styles from "./layout.module.css";

export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
