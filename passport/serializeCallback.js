export const serializeCb = (user, done) => {
  return done(null, user.id);
};
