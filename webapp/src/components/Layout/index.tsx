import { createRef } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../Breadcump";
import { Sidebar } from "../Sidebar";

import styles from "./index.module.scss";

export const layoutContentRef = createRef<HTMLDivElement>();

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content} ref={layoutContentRef}>
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
};
