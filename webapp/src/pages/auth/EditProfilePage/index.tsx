import { type TrpcRouterOutput } from "@ideation/backend/src/router";
import { zEditPasswordTrpcScheme } from "@ideation/backend/src/router/auth/updatePassword/input";
import { zEditProfileTrpcScheme } from "@ideation/backend/src/router/auth/updateProfile/input";
import { z } from "zod";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { FormItems } from "../../../components/FormItems";
import { Input } from "../../../components/Input";
import { Segment } from "../../../components/Segment";
import { useForm } from "../../../lib/form";
import { withPageWrapper } from "../../../lib/pageWrapper";
import { trpc } from "../../../lib/trpc";

const GeneralForm = ({
  me,
}: {
  me: NonNullable<TrpcRouterOutput["getMe"]["me"]>;
}) => {
  const trpcUtils = trpc.useContext();
  const updateProfile = trpc.updateProfile.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zEditProfileTrpcScheme,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values);
      trpcUtils.getMe.setData(undefined, updatedMe);
    },
    successMessage: "Profile updated",
    resetOnSuccess: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Name" name="name" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  );
};

const UpdatePassword = () => {
  const updatePassword = trpc.updatePassword.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
    },
    validationSchema: zEditPasswordTrpcScheme
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords must be the same",
            path: ["newPasswordAgain"],
          });
        }
      }),
    onSubmit: async (values) => {
      await updatePassword.mutateAsync(values);
    },
    successMessage: "Password updated",
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input
          label="Old password"
          name="oldPassword"
          type="password"
          formik={formik}
        />
        <Input
          label="New password"
          name="newPassword"
          type="password"
          formik={formik}
        />
        <Input
          label="New password again"
          name="newPasswordAgain"
          type="password"
          formik={formik}
        />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Password</Button>
      </FormItems>
    </form>
  );
};

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  return (
    <>
      <Segment title="Edit Profile">
        <Segment title="General" size={2}>
          <GeneralForm me={me} />
        </Segment>
        <Segment title="Update Password">
          <UpdatePassword />
        </Segment>
      </Segment>
    </>
  );
});
