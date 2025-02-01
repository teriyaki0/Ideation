import { zSignInTrpcScheme } from "@ideation/backend/src/router/signIn/input";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { useForm } from "../../lib/form";
import { getAllIdeasRoute } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

export const SignInPage = () => {
  const trpcUtils = trpc.useContext();
  const navigate = useNavigate();
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
      void navigate(getAllIdeasRoute());
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
};
