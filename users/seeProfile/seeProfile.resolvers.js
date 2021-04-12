import client from "../../client";

export default {
  Query: {
    seeProfile: async (_, {username}) => {
      const result = await client.user.findUnique({
        where: {
          username,
        },
        include: {
          followers: true,
          following: true,
        }
      })

      return result
    }
  }
}