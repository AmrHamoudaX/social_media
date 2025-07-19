import { Post } from "./post.js";
import { User } from "./user.js";
import { Team } from "./team.js";
import { Membership } from "./membership.js";

User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

export { Post, User, Team, Membership };
