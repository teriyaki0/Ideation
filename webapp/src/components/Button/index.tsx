import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  mode?: "default" | "primary" | "danger";
};

export const Button = ({
  children,
  loading = false,
  mode = "default",
}: ButtonProps) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles.disabled]: loading,
        [styles[mode]]: true,
      })}
      type="submit"
      disabled={loading}
    >
      {loading ? "...Submitting" : children}
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
