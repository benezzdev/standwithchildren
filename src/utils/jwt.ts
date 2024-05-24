import jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
  const secret = process.env.JWT_SECRET as string;
  const payload = {
    sub: user.email,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, secret, options);
  return token;
};
