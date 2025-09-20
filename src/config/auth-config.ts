export const JWT_EXPIRY = 86400 * 7; //! 7 days
export const JWT_TOKEN_COOKIE_NAME = "token";
export const USER_DATA_COOKIE_NAME = "user_data";

const authConfig = {
  //! JWT
  jwt: {
    algorithm: "HS512",
    expires: JWT_EXPIRY,
    iss: "https://nextjs-jwt-auth.yaa.bz",
    aud: "nextjs-jwt-auth",
    clockTolerance: 5, //! 5 seconds
    cookieParams: {
      name: JWT_TOKEN_COOKIE_NAME,
      httpOnly: true,
      sameSite: "strict" as const, //! this must be a const
      secure: true,
      maxAge: JWT_EXPIRY,
      path: "/",
    },
    kvJtiPrefix: "jwt::",
    userDataCookieParams: {
      name: USER_DATA_COOKIE_NAME,
      httpOnly: false,
      sameSite: "strict" as const, //! this must be a const
      secure: true,
      maxAge: JWT_EXPIRY,
      path: "/",
    },
  },
  //! Argon2
  argon2: {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
    hashLength: 32,
    type: 2,
  },
};

export default authConfig;
