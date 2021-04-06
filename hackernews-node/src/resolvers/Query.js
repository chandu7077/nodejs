const feed = async (parent, args, context, info) => {
    const where = args.filter
      ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
      : {}
  
    const links = await context.prisma.link.findMany({
      where,
      skip: args.skip,
      take: args.take,
      orderBy: args.orderBy,
    })
    
    const count = await context.prisma.link.count({ where })

  return {
    links,
    count,
  }
  }

const info = () => {
    return `This is the API of a Hackernews Clone`;
  }

const link = async (parent,args, context) => {

    const result = await context.prisma.link.findFirst({where:{id:args.id}});
    console.log(result);
    if(result.length === 0) {
        throw new Error("Not found")
    }
    return result;
}

export default {info, link, feed}