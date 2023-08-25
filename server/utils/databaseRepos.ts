import { databaseSrc } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Reply } from "../entity/Reply";
import { Follow } from "../entity/Follow";

export const postRepo = databaseSrc.getRepository(Post);
export const userRepo = databaseSrc.getRepository(User);
export const replyRepo = databaseSrc.getRepository(Reply);
export const followRepo = databaseSrc.getRepository(Follow);
