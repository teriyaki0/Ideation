import cn from "classnames";
import styles from "./index.module.scss";

export const Alert = ({
  mode,
  children,
}: {
  mode: "success" | "error";
  children: React.ReactNode;
}) => {
  return (
    <div className={cn({ [styles.alert]: true, [styles[mode]]: true })}>
      {children}
    </div>
  );
};
