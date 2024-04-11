import jwt, {Secret} from 'jsonwebtoken';
export async function createAuthToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET,{
      expiresIn: "24h",
    });
  };