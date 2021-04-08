import Link from "../models/link"
import User from "../models/user";
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';

const feed = async (parent, args, context, info) => {
    const where = args.filter
      ? {
        [Op.or]: [
          { 
              description: 
              { 
                  [Op.contains]: [args.filter] 
                } 
            },
          {
               url: 
                { 
                    [Op.contains]: [args.filter] 
                } 
            },
        ],
      }
      : {}
  
    const {rows,count} = await Link.findAndCountAll({
      where,
      limit: args.take,
      offset: args.skip,
      order: [["description", args.orderBy.description]]
    })

  return {
    links:rows,
    count,
  }
  }

const info = () => {
    return `This is the API of a Hackernews Clone`;
  }

const link = async (parent,args, context) => {

    const result = await User.findOne({where:{id:args.id}});
    console.log(result);
    if(result.length === 0) {
        throw new Error("Not found")
    }
    return result;
}

export default {info, link, feed}