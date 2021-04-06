import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { APP_SECRET, getUserId } from '../utils.js';

const  vote = async (parent, args, context, info) => {
    // 1
    const userId = getUserId(context)
  
    // 2
    const evote = await context.prisma.vote.findUnique({
      where: {
        linkId_userId: {
          linkId: Number(args.linkId),
          userId: userId
        }
      }
    })
  
    if (Boolean(evote)) {
      throw new Error(`Already voted for link: ${args.linkId}`)
    }
  
    // 3
    const newVote = context.prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: Number(args.linkId) } },
      }
    })
    context.pubsub.publish("NEW_VOTE", newVote)
  
    return newVote
  }

const post = async (parent, args, context, info) => {
    const { userId } = context;
  
   const newLink = await context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      }
    })
    context.pubsub.publish("NEW_LINK", newLink)
    return newLink;
  }

const signup = async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.user.create({ data: { ...args, password } })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
      token,
      user,
    }
  }
  
  const login = async (parent, args, context, info) => {

    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
      token,
      user,
    }
  }

  export default {post, signup, login, vote};