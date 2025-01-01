import jwt from "jsonwebtoken";
// const sessionIdToUserMap = new Map();

// Creation of Secret Key
const secretKey = "shorturl@nodejsproject";

export const setUser = (user) => {
  //   sessionIdToUserMap.set(id, user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secretKey
  );
};

export const getUser = (token) => {
  //   return sessionIdToUserMap.get(id);
  if (!token) {
    return null;
  }
  return jwt.verify(token, secretKey);
};

// Commented out code was earlier used for stateful authentication - Session-id

