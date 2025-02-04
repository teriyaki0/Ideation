import { zSignInTrpcScheme } from "@ideation/backend/src/router/auth/signIn/input";
import Cookies from "js-cookie";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { FormItems } from "../../../components/FormItems";
import { Input } from "../../../components/Input";
import { Segment } from "../../../components/Segment";
import { useForm } from "../../../lib/form";
import { withPageWrapper } from "../../../lib/pageWrapper";
import { trpc } from "../../../lib/trpc";

export const SignInPage = withPageWrapper({ redirectAuthorized: true })(() => {
  const trpcUtils = trpc.useContext();
  const signIn = trpc.signIn.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: "",
      password: "",
    },
    validationSchema: zSignInTrpcScheme,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set("token", token, { expires: 9999 });
      void trpcUtils.invalidate();
    },
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
