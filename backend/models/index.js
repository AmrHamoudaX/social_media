import { Post } from "./post.js";
import { User } from "./user.js";

User.hasMany(Post);
Post.belongsTo(User);
Post.sync({ alter: true });
User.sync({ alter: true });

export { Post, User };
