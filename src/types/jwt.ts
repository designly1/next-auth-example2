import type { JWTPayload } from "jose";

export interface I_AuthPayload extends JWTPayload {
  email: string;
  jti?: string;
}
