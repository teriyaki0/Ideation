import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getViewIdeaRoute } from "../../lib/routes";
import { Segment } from "../Segment";

import styles from "./index.module.scss";

export const Idea = ({
  nick,
  name,
  description,
  createdAt,
}: {
  nick: string;
  name: string;
  description: string;
  createdAt: string;
}) => {
  return (
    <Link className={styles.link} to={getViewIdeaRoute({ ideaNick: nick })}>
      <div className={styles.idea} key={nick}>
        <Segment title={name} description={description} />
        <div className={styles.createdAt}>
          Created At: {format(createdAt, "yyyy-MM-dd")}
        </div>
      </div>
    </Link>
  );
};
