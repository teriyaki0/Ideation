import { zCreateIdeaTrpcScheme } from "@ideation/backend/src/router/createIdea/input";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { Textarea } from "../../components/Textarea";
import { useForm } from "../../lib/form";
import { getAllIdeasRoute } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

import styles from "./index.module.scss";

export const NewIdeaPage = () => {
  const navigate = useNavigate();
  const createIdea = trpc.createIdea.useMutation();

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validationSchema: zCreateIdeaTrpcScheme,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
      void navigate(getAllIdeasRoute());
    },
    showValidationAlert: true,
    successMessage: "Idea created successfully",
  });

  return (
    <div className={styles.root}>
      <Segment title="New Idea">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <FormItems>
            <Input name="name" label="Name" formik={formik} />
            <Input name="nick" label="Nick" formik={formik} />
            <Input
              name="description"
              label="Description"
              formik={formik}
              maxWidth={550}
            />
            <Textarea name="text" label="Text" formik={formik} />
            <Alert {...alertProps} />
            <Button {...buttonProps}>Create Idea</Button>
          </FormItems>
        </form>
      </Segment>
    </div>
  );
};
