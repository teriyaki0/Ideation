import { Outlet } from "react-router-dom";
import Breadcrumbs from "../Breadcump";
import { Sidebar } from "../Sidebar";

import styles from "./index.module.scss";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
};
