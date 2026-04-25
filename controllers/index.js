export const getIndex = (req, res) => {
  res.render("pages/index");
};
export const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};
