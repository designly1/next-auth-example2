import type { I_User, I_UserPublic } from "@/types/user";

export const users: I_User[] = [
  {
    id: "1000000000",
    email: "john@example.com",
    name: "John Doe",
    password:
      "$argon2id$v=19$m=19456,t=2,p=1$Op394ZJ1DZ6r6/RZxOu2QA$ZA+dtxmyDg87OIlD3zrYxSfATm0v8QRTXrCnUmN1duI",
  },
];

export function exportPublicUser(user: I_User): I_UserPublic {
  // biome-ignore lint: we want to remove the password to follow the omit pattern from interface
  const { password, ...publicUser } = user;
  return publicUser;
}

export async function getUserByEmail(
  email: string,
): Promise<I_User | undefined> {
  //! Generate a delay to simulate a database call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return users.find((user) => user.email === email);
}
