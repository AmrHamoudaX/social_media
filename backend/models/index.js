import { Post } from "./post.js";
import { User } from "./user.js";

Post.sync({ alter: true });
User.sync({ alter: true });

export { Post, User };
