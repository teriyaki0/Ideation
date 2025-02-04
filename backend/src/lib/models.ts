import { type User } from "@prisma/client";
import _ from "lodash";

export const toClientMe = (me: User | null) => {
  return { me: me && _.pick(me, ["id", "nick", "name"]) };
};
