import _, {filter,map} from "lodash";
import mutations from "./resolvers/Mutation.js"
import queries from "./resolvers/Query.js"
import Link from "./resolvers/Link.js"
import User from "./resolvers/User.js"
import Subscription from "./resolvers/Subscription.js"
import Vote from "./resolvers/Vote.js"
export default {
    Query:queries,
    Mutation:mutations,
    Link,
    User,
    Subscription,
    Vote
};