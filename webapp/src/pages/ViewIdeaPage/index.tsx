import { useParams } from "react-router-dom";
import { type ViewIdeaRouteParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;

  const { data, error, isError, isFetching, isLoading } =
    trpc.getIdeaNick.useQuery({ ideaNick });

  if (isLoading || isFetching) {
    return <div>Loading..</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data.idea) {
    return <div>Not Found Idea 404</div>;
  }

  return (
    <div>
      <h1>{data.idea.name}</h1>
      <p>{data.idea.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </div>
  );
};
