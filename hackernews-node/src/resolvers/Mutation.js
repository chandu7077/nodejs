import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { APP_SECRET, getUserId } from '../utils.js';
import Link from "../models/link.js"
import User from "../models/user.js";
import Vote from "../models/vote.js";

const  vote = async (parent, args, context, info) => {
    const userId = getUserId(context);
    const evote = await Vote.findOne({
      where: {
          linkId: Number(args.linkId),
          userId: userId
        }
    })
    if (Boolean(evote)) {
      throw new Error(`Already voted for link: ${args.linkId}`)
    }
    const newVote = await Vote.create({
        userId: userId,
        linkId:  Number(args.linkId)
    })
    context.pubsub.publish("NEW_VOTE", newVote)
  
    return newVote
  }

const post = async (parent, args, context, info) => {
  const { userId } = context;
  const user = await User.findOne({where:{id:userId}});
  console.log(args)
  const newLink = await user.createLink({
        url: args.url,
        description: args.description
    })
    context.pubsub.publish("NEW_LINK", newLink)
    return newLink;
}

const signup = async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await User.create( { ...args, password })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
      token,
      user,
    }
  }
  
  const login = async (parent, args, context, info) => {

    const user = await User.findOne({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET,{ expiresIn: '24h' })
    return {
      token,
      user,
    }
  }

  export default {post, signup, login, vote};