import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { Segment } from "../../components/Segment";
import { type ViewIdeaRouteParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

import styles from "./index.module.scss";

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;

  const { data, error, isError, isFetching, isLoading } = trpc.getIdea.useQuery(
    { ideaNick }
  );

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
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={styles.createdAt}>
        Created At: {format(data.idea.createdAt, "yyyy-MM-dd")}
      </div>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: data.idea.text }}
      />
    </Segment>
  );
};
