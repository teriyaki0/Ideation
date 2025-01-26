import cn from "classnames";
import styles from "./index.module.scss";

export const Button = ({
  children,
  loading = false,
  mode = "default",
}: {
  children: React.ReactNode;
  loading?: boolean;
  mode?: "default" | "primary" | "danger";
}) => {
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
