import { createWriteStream } from "fs"
import bcrypt from "bcrypt"
import client from "../../client"
import { protectedResolver } from "../users.utils"

const resolver = async (
  _,
  {
    firstName,
    lastName,
    username,
    email,
    password: newPassword,
    bio,
    avatar,
  },
  {loggedInUser}
) => {
  const {filename, createReadStream} = await avatar
  const readStream = createReadStream()
  const writeStream = createWriteStream(
    `${process.cwd()}/uploads/${filename}`,
    {flags: "w"}
  )
  
  readStream.pipe(writeStream)
  readStream.on("Error", (error) => console.log(error))

  // console.log(stream)

  let uglyPassword = null
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10)
  }

  const updatedUser = await client.user.update(
    {
      where: {
        id: loggedInUser?.id
      },
      data: {
        firstName,
        lastName,
        username,
        email,
        bio,
        ...(uglyPassword && {password: uglyPassword}),
      }
    })

  return {
    ok: updatedUser.id ? true : false,
    ...(!updatedUser.id) && {error: "Could not update profile."}
  }
}

export default {
  Mutation: {
    editProfile: protectedResolver(resolver)
  }
}