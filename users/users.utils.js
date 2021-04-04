import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  if (!token) {return null}

  try {
    const {id} = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await client.user.findUnique({where: {id}})

    return user ? user : null
  } catch(e) {
    return null
  }
}

export const protectedResolver = (ourResolver) => 
  (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok:false,
        error: "Please login to perform this action.",
      }
    }

    return ourResolver(root, args, context, info)
  }