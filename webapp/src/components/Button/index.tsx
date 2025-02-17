import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  mode?: "default" | "primary" | "danger";
};

export const Button = ({
  children,
  loading = false,
  mode = "default",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles.disabled]: loading,
        [styles[mode]]: true,
        [styles.loading]: loading,
      })}
      type="submit"
      disabled={loading}
      onClick={onClick}
    >
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export const LinkButton = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <Link
      to={to}
      className={cn({
        [styles.button]: true,
      })}
    >
      {children}
    </Link>
  );
};
