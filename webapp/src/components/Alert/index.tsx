import cn from "classnames";
import styles from "./index.module.scss";

export type AlertProps = {
  mode: "success" | "error" | "info";
  hidden?: boolean;
  children: React.ReactNode;
};

export const Alert = ({ mode, hidden, children }: AlertProps) => {
  if (hidden) {
    return null;
  }
  return (
    <div className={cn({ [styles.alert]: true, [styles[mode]]: true })}>
      {children}
    </div>
  );
};
