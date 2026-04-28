export const getIndex = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/folders");
  } else {
    return res.redirect("/login");
  }
};
export const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/login");
  });
};
