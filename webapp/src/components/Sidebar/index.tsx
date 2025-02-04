import cn from "classnames";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMe } from "../../lib/ctx";
import {
  getAllIdeasRoute,
  getEditProfileRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from "../../lib/routes";
import { Segment } from "../Segment";
import styles from "./index.module.scss";

export const Sidebar = () => {
  const me = useMe();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={cn({ [styles.sidebar]: true, [styles.open]: isOpen })}>
      <div className={styles.burger} onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="21"
          viewBox="0 0 24 21"
          fill="none"
        >
          <path d="M0 0V3H24V0H0ZM0 8.91V11.91H24V8.91H0ZM0 17.91V20.91H24V17.91H0Z" />
        </svg>
      </div>
      <div className={cn({ [styles.menu]: true, [styles.open]: isOpen })}>
        <Segment title="Ideations">
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link className={styles.link} to={getAllIdeasRoute()}>
                All Ideas
              </Link>
            </li>
          </ul>
        </Segment>
        <Segment title="Account">
          {me ? (
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link className={styles.link} to={getNewIdeaRoute()}>
                  New Idea
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={getEditProfileRoute()}>
                  Edit Profile
                </Link>
              </li>
              <li className={styles.item}>
                <Link
                  className={cn({ [styles.link]: true, [styles.logout]: true })}
                  to={getSignOutRoute()}
                >
                  Logout ({me.nick})
                </Link>
              </li>
            </ul>
          ) : (
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link className={styles.link} to={getSignInRoute()}>
                  Sign In
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </Segment>
      </div>
    </aside>
  );
};
