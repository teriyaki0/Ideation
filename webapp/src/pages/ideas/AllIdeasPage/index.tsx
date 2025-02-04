import { Idea } from "../../../components/Idea";
import { Segment } from "../../../components/Segment";
import { trpc } from "../../../lib/trpc";
import styles from "./index.module.scss";

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
    <Segment title="All Ideas">
      <div className={styles.ideas}>
        {data.ideas.map((idea) => (
          <Idea
            key={idea.nick}
            name={idea.name}
            nick={idea.nick}
            description={idea.description}
            createdAt={idea.createdAt}
          />
        ))}
      </div>
    </Segment>
  );
};
