import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id }, "bcjcbjbsjcbn", {
    expiresIn: "7d",
  });
};

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, "jbcdjbcjsdbj", {
    expiresIn: "15m",
  });
};
