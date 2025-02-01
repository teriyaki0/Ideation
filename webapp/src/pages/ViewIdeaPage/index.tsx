import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { LinkButton } from "../../components/Button";
import { Segment } from "../../components/Segment";
import { getEditIdeaRoute, type ViewIdeaRouteParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

import styles from "./index.module.scss";

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({ ideaNick });

  const getMeResult = trpc.getMe.useQuery();

  if (
    getIdeaResult.isLoading ||
    getIdeaResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading...</span>;
  }
  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }
  if (getIdeaResult.isError) {
    return <div>Error: {getIdeaResult.error.message}</div>;
  }

  const idea = getIdeaResult.data.idea;
  const me = getMeResult.data?.me;

  if (!idea) {
    return <div>Not Found Idea 404</div>;
  }

  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={styles.createdAt}>
        Created At: {format(idea.createdAt, "yyyy-MM-dd")}
      </div>
      <div className={styles.author}>
        Author: <b>{idea.author.nick}</b>
      </div>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: idea.text }}
      />
      {idea.authorId === me.id && (
        <div className={styles.edit}>
          <LinkButton to={getEditIdeaRoute({ ideaNick })}>Edit</LinkButton>
        </div>
      )}
    </Segment>
  );
};
