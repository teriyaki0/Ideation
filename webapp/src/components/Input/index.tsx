import cn from "classnames";
import { type FormikProps } from "formik";

import styles from "./index.module.scss";

export const Input = ({
  name,
  label,
  formik,
  maxWidth,
  type = "text",
}: {
  name: string;
  label: string;
  formik: FormikProps<any>;
  maxWidth?: number;
  type?: "text" | "password";
}) => {
  const value = formik.values[name];
  const error = (formik.errors[name] as string) || undefined;
  const touched = formik.touched[name];
  const inValid = !!touched && !!error;
  const disabled = formik.isSubmitting;

  return (
    <fieldset
      className={cn({ [styles.field]: true, [styles.disabled]: disabled })}
    >
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cn({ [styles.input]: true, [styles.invalid]: inValid })}
        style={{ maxWidth }}
        type={type}
        onChange={(e) => {
          e.preventDefault();
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={(e) => {
          void formik.setFieldTouched(name);
        }}
        disabled={disabled}
        value={value}
        name={name}
        id={name}
      />
      {inValid && <div className={styles.error}>{error}</div>}
    </fieldset>
  );
};
