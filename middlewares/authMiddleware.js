import { getUser } from "../services/auth.js";

export const checkForAuthentication = (req, res, next) => {
  console.log("checkForAuthentication");
  const userToken = req.cookies?.uid;
  req.user = null;
  if (!userToken) {
    return next();
  }

  const user = getUser(userToken);

  req.user = user;
  return next();
};

export const restrictTo = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect("/login");
    }

    if (!roles.includes(req.user.role)) {
      return res.end("UnAuthorized");
    }

    return next();
  };
};
