import { Link } from "react-router-dom";
import { Segment } from "../../components/Segment";
import { getViewIdeaRoute } from "../../lib/routes";
import { trpc } from "../../lib/trpc";
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
          <div className={styles.idea} key={idea.nick}>
            <Segment
              title={
                <Link
                  className={styles.link}
                  to={getViewIdeaRoute({ ideaNick: idea.nick })}
                >
                  {idea.name}
                </Link>
              }
              size={2}
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  );
};
