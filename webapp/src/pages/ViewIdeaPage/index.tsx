import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { LinkButton } from "../../components/Button";
import { Segment } from "../../components/Segment";
import { withPageWrapper } from "../../lib/pageWrapper";
import { getEditIdeaRoute, type ViewIdeaRouteParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

import styles from "./index.module.scss";

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams;
    return trpc.getIdea.useQuery({ ideaNick });
  },
  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: "Idea not Found",
  setProps: ({ queryResult, ctx }) => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      idea: queryResult.data.idea!,
      me: ctx.me,
    };
  },
})(({ idea, me }) => (
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
    {idea.authorId === me?.id && (
      <div className={styles.edit}>
        <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>
          Edit
        </LinkButton>
      </div>
    )}
  </Segment>
));
