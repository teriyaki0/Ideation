import styles from "./index.module.scss";

export const Segment = ({
  title,
  size = 1,
  description,
  children,
}: {
  title: React.ReactNode;
  size?: 1 | 2;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <div className={styles.root}>
      {size === 1 ? (
        <h1 className={styles.title}>{title}</h1>
      ) : (
        <h2 className={styles.title}>{title}</h2>
      )}
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};
