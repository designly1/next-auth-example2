import { hash } from "@node-rs/argon2";
import authConfig from "@/config/auth-config";

(async () => {
  const password = process.argv[2].trim();
  const h = await hash(password, authConfig.argon2);
  console.log(h);
})();
