import crypto from "crypto";
import { nanoid } from "nanoid";

(async () => {
  // Generate 512-bit (64-byte) random secret for HS512
  const secret = crypto.randomBytes(64).toString("base64");

  // Generate a random kid
  const kid = nanoid();

  console.log("HS512 Secret:", secret);
  console.log("kid:", kid);
})();
