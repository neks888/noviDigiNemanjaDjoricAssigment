import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = "mySecret"; // Use environment variable in production

interface IRequest extends Request {
  userId?: string;
}

const auth = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded: any = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
