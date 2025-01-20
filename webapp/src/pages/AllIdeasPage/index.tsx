import { Link } from "react-router-dom";
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
    <div>
      <h1 className={styles.title}>All Ideas</h1>
      <div className={styles.ideas}>
        {data.ideas.map((idea) => (
          <div className={styles.idea} key={idea.nick}>
            <h2 className={styles.ideaName}>
              <Link
                className={styles.ideaLink}
                to={getViewIdeaRoute({ ideaNick: idea.nick })}
              >
                {idea.name}
              </Link>
            </h2>
            <p className={styles.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
