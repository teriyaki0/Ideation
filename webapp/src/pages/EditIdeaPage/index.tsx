import { type TrpcRouterOutput } from "@ideation/backend/src/router";
import { zUpdateIdeaTrpcScheme } from "@ideation/backend/src/router/updateIdea/input";
import { pick } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { Textarea } from "../../components/Textarea";
import { useForm } from "../../lib/form";
import { getViewIdeaRoute, type EditIdeaRouteParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

const EditIdeaForm = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput["getIdea"]["idea"]>;
}) => {
  const navigate = useNavigate();
  const updateIdea = trpc.updateIdea.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(idea, ["name", "nick", "description", "text"]),
    validationSchema: zUpdateIdeaTrpcScheme.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values });
      void navigate(getViewIdeaRoute({ ideaNick: values.nick }));
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
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Idea</Button>
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
