import client from "../client";

export default {
  Query: {
    seeProfile: (_, {username}) => {
        console.log(username)
        return client.user.findUnique({
        where: {
          username,
        }
      })
    }
  }
}