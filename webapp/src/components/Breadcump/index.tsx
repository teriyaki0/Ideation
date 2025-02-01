import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.scss";

type BreadcrumbMap = Record<string, string>;

const breadcrumbNameMap: BreadcrumbMap = {
  "/": "All Ideas",
  "/ideas/new": "New Idea",
  "/profile": "Profile",
  "/settings": "Settings",
  "/sign-in": "Sign In",
  "/sign-up": "Sign Up",
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.breadcrumb}>
        <li className={styles.breadcrumbItem}>
          <Link to="/">All Ideas</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const breadcrumbName = breadcrumbNameMap[to];

          if (!breadcrumbName) {
            return null;
          }

          return (
            <li key={to} className={styles.breadcrumbItem}>
              {index < pathnames.length - 1 ? (
                <Link to={to}>{breadcrumbName}</Link>
              ) : (
                <span>{breadcrumbName}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
