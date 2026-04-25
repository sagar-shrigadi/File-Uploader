import "dotenv/config";
import { getUserAuthDetails } from "../queries/user.js";
import * as argon2 from "argon2";

export const verifyCb = async (username, password, done) => {
  try {
    const user = await getUserAuthDetails(username);
    // console.log("User data when authenticating", user);

    // compare plain text user entered password to argon hash stored in db
    const match = await argon2.verify(
      user?.password ?? process.env.FALLBACK_HASH,
      password,
    );
    if (!(user && match)) {
      return done(null, false, { message: "Incorrect Username or Password!" });
    } else {
      return done(null, user);
    }
  } catch (error) {
    return done(error);
  }
};
