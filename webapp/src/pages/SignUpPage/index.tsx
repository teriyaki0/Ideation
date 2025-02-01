import { zSignUpTrpcScheme } from "@ideation/backend/src/router/signUp/input";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { getAllIdeasRoute } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

export const SignUpPage = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const navigate = useNavigate();
  const trpcUtils = trpc.useContext();

  const signUp = trpc.signUp.useMutation();

  const formik = useFormik({
    initialValues: {
      nick: "",
      password: "",
      passwordAgain: "",
    },
    validate: withZodSchema(
      zSignUpTrpcScheme
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((value, ctx) => {
          if (value.password !== value.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "",
              path: ["passwordAgain"],
            });
          }
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        const { token } = await signUp.mutateAsync(values);
        Cookies.set("token", token, { expires: 9999 });
        void trpcUtils.invalidate();
        void navigate(getAllIdeasRoute());
      } catch (error: any) {
        setSubmittingError(error.message);
      }
    },
  });
  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Input
            label="Password again"
            name="passwordAgain"
            type="password"
            formik={formik}
          />
          {!formik.isValid && !!formik.submitCount && (
            <Alert mode="error">Some fields are invalid</Alert>
          )}
          {submittingError && <Alert mode="error">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
