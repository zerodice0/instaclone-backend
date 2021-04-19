import client from "../client";

export default {
  User: {
    totalFollowing: ({id}) => client.user.count(
      {where: {
        followers: {
          some: {
            id,
          }
        }
      }}
    ),
    totalFollowers: ({id}) => client.user.count({
      where: {
        following: {
          some: {
            id,
          }
        }
      }
    }),
    isMe: ({id}, _, {loggedInUser}) => {
      return loggedInUser && (loggedInUser.id === id)
    },
    isFollowing: async ({id}, _, {loggedInUser}) => {
      if (!loggedInUser) {
        return false
      }

      // const exists = await client.user
      // .findUnique({ where: { username: loggedInUser.username } })
      // .following(({where:{id,}}))

      const exists = await client.user.count({where: {
        username: loggedInUser.username,
        following: {
          some: {
            id,
          }
        }
      }})

      return Boolean(exists)
    }
  }
}