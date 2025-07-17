import { Post } from "./post.js";
import { User } from "./user.js";

User.hasMany(Post);
Post.belongsTo(User);

export { Post, User };
