import { zCreateIdeaTrpcScheme } from "@ideation/backend/src/router/createIdea/input";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { Textarea } from "../../components/Textarea";
import { trpc } from "../../lib/trpc";

import styles from "./index.module.scss";

export const NewIdeaPage = () => {
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const createIdea = trpc.createIdea.useMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validate: withZodSchema(zCreateIdeaTrpcScheme),
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values);
        setMessageSuccess(true);
        setTimeout(() => {
          setMessageSuccess(false);
        }, 3000);
      } catch (error: any) {
        setSubmittingError(error.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
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
            {!!submittingError && <Alert mode="error">{submittingError}</Alert>}
            {messageSuccess && <Alert mode="success">Idea created!</Alert>}
            <Button loading={formik.isSubmitting}>Create Idea</Button>
          </FormItems>
        </form>
      </Segment>
    </div>
  );
};
