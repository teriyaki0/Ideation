import { type TrpcRouterOutput } from "@ideation/backend/src/router";
import { zUpdateIdeaTrpcScheme } from "@ideation/backend/src/router/updateIdea/input";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { pick } from "lodash";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { Textarea } from "../../components/Textarea";
import { getViewIdeaRoute, type EditIdeaRouteParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

const EditIdeaForm = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput["getIdea"]["idea"]>;
}) => {
  const navigate = useNavigate();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const updateIdea = trpc.updateIdea.useMutation();
  const formik = useFormik({
    initialValues: pick(idea, ["name", "nick", "description", "text"]),
    validate: withZodSchema(zUpdateIdeaTrpcScheme.omit({ ideaId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await updateIdea.mutateAsync({ ideaId: idea.id, ...values });
        void navigate(getViewIdeaRoute({ ideaNick: values.nick }));
      } catch (err: any) {
        setSubmittingError(err.message);
      }
    },
  });

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Description"
            name="description"
            maxWidth={500}
            formik={formik}
          />
          <Textarea label="Text" name="text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && (
            <Alert mode="error">Some fields are invalid</Alert>
          )}
          {submittingError && <Alert mode="error">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams;

  const getMeResult = trpc.getMe.useQuery();
  const getIdeaResult = trpc.getIdea.useQuery({ ideaNick });

  if (
    getIdeaResult.isLoading ||
    getIdeaResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading...</span>;
  }

  if (getMeResult.isError) {
    return <div>Error: {getMeResult.error.message}</div>;
  }

  if (getIdeaResult.isError) {
    return <div>Error: {getIdeaResult.error.message}</div>;
  }

  if (!getIdeaResult.data.idea) {
    return <div>Not Found Idea 404</div>;
  }

  const idea = getIdeaResult.data.idea;

  const me = getMeResult.data.me;

  if (!me) {
    return <div>Only of authorized</div>;
  }

  if (me.id !== idea.author.id) {
    return <div>Only of author</div>;
  }

  return <EditIdeaForm idea={idea} />;
};
