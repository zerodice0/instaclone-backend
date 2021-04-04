import client from "../../client";

export default {
  Query: {
    seeProfile: async (_, {username}) => {
      console.log(username)
      const result = await client.user.findUnique({
        where: {
          username,
        }
      })

      return result
    }
  }
}