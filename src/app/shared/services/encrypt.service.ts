import { PublicKey } from "../constants/rsa.constant";
import * as forge from "node-forge"
export class RSAService {

  constructor() { }

  encrypt(text: string): any {
    const publicKey = forge.pki.publicKeyFromPem(PublicKey);
    const encrypted = publicKey.encrypt(text, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: forge.mgf1.create()
    });
    const base64 = forge.util.encode64(encrypted);
    return base64
  }

}
