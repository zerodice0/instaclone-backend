import client from "../../client";
import { protectedResolver } from "../users.utils";

const _isUsernameNotExist = async(username) =>
  (await client.user.findUnique({where: {username}})) == null

export default {
  Mutation: {
    followUser: protectedResolver(async(_, {username}, {loggedInUser}) => {
      const isUsernameNotExist = await _isUsernameNotExist(username)
      const isTryToFollowingMySelf = (username === loggedInUser.username)

      let result = false
      let message = null

      if (!isUsernameNotExist && !isTryToFollowingMySelf) {
        await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            following: {
              connect: {
                username,
              }
            }
          }
        })

        result = true
      } else {
        message = isUsernameNotExist
          ? "That user does not exist"
          : "You can't follow yourself"
      }

      return {
        ok: result,
        error: message, 
      }
    })
  }
}