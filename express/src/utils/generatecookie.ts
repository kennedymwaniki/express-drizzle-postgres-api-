import jwt from "jsonwebtoken";

const generateCookie = (user: any, res: any) => {
  // generate jwt token
  const payload = {
    id: user.userId,
    role: user.role,
    // Session to expire after 3 hours
    exp: Math.floor(Date.now() / 1000) + 60 * 180,
  };
  const SECRET = process.env.secret!;
  const token = jwt.sign(payload, SECRET);
  // set jwt as http only cookie

  res.cookie("jwt", token, {
    httpOnly: true,
    // if it is not in production it is in development mode
    secure: process.env.NODE_ENV! !== "production",
    sameSite: "strict",
    maxAge: 60 * 180 * 1000,
  });
};

export default generateCookie;
