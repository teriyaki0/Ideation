import { trpc } from "../../lib/trpc";

export const AllIdeasPage = () => {
  const { data, error, isLoading, isError, isFetching } =
    trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.ideas.map((idea) => {
        return (
          <div key={idea.nick}>
            <span> {idea.name}</span>
            <span> {idea.description}</span>
          </div>
        );
      })}
    </div>
  );
};
