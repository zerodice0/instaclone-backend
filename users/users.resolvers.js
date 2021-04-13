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
    }
  }
}