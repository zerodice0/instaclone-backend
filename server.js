import dotenv from "dotenv"
dotenv.config()

import {ApolloServer} from "apollo-server"
import {typeDefs, resolvers} from "./schema"
import {getUser} from "./users/users.utils"

const PORT = process.env.PORT
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({req}) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
    }
  }
})

server.listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`))