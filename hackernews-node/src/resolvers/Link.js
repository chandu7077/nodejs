import Link from "../models/link.js";
import User from "../models/user.js"

async function postedBy(parent, args, context) {
    const link  = await Link.findOne({ where: { id: parent.id } });
    return await link.getUser();
}

async function votes(parent, args, context) {
    console.log("votes from links")
    const link  = await Link.findOne({ where: { id: parent.id } });
    const evotes = await link.getVotes()
    return evotes;
}

export default {postedBy, votes}