import Vote from "../models/vote"

async function link(parent, args, context) {
    const vote = await Vote.findOne({ where: { id: parent.id } });
    return await vote.getLink();
}
  
async function user(parent, args, context) {
    const vote = await Vote.findOne({ where: { id: parent.id } });
    return await vote.getUser();
}

  export default {link,user}