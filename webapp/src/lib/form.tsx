import { useFormik, type FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useMemo, useState } from "react";
import { type z } from "zod";
import { type AlertProps } from "../components/Alert";
import { type ButtonProps } from "../components/Button";

export const useForm = <TZodSchema extends z.ZodTypeAny>({
  successMessage = null,
  resetOnSuccess = true,
  showValidationAlert = false,
  initialValues = {},
  validationSchema,
  onSubmit,
}: {
  successMessage?: string | null;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  initialValues?: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  onSubmit: (
    values: z.infer<TZodSchema>,
    actions: FormikHelpers<z.infer<TZodSchema>>
  ) => Promise<any> | any;
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<Error | null>(null);

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, formikHelpers) => {
      try {
        setSubmittingError(null);

        await onSubmit(values, formikHelpers);
        if (resetOnSuccess) {
          formikHelpers.resetForm();
          setSuccessMessageVisible(true);
          setTimeout(() => {
            setSuccessMessageVisible(false);
          }, 3000);
        }
      } catch (error: any) {
        setSubmittingError(error);
      }
    },
  });

  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        hidden: false,
        children: submittingError.message,
        mode: "error",
      };
    }
    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        children: "Some fields are invalid",
        mode: "error",
      };
    }
    if (successMessageVisible && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        mode: "success",
      };
    }
    return {
      mode: "error",
      hidden: true,
      children: null,
    };
  }, [
    submittingError,
    formik.isValid,
    formik.submitCount,
    successMessageVisible,
    successMessage,
    showValidationAlert,
  ]);

  const buttonProps = useMemo<Omit<ButtonProps, "children">>(() => {
    return {
      loading: formik.isSubmitting,
    };
  }, [formik.isSubmitting]);

  return {
    formik,
    alertProps,
    buttonProps,
  };
};
