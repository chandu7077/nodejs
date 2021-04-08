import User from "../models/user";

async function links(parent, args, context) {
    const user  = await User.findOne({ where: { id: parent.id } });
    const links = user.getLinks();
    return links;
}

async function votes(parent, args, context) {
    console.log("votes from user")
    const user  = await User.findOne({ where: { id: parent.id } });
    const evotes = await user.getVotes()
    return evotes;
}

export default {links,votes};