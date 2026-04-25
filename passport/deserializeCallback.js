import { getUserById } from "../queries/user.js";

export const deserializeCb = async (id, done) => {
  try {
    const user = await getUserById(id);
    // console.log(`user data when deserializing user i.e by user fetched by id`, user);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};
