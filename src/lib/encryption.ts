import CryptoJS from "crypto-js";

type EncryptPassProps = {
  pass: string;
  master_pass: string;
};

const KEY_SIZE = 256 / 32; // AES-256 => 32 bytes => 8 words
const ITERATIONS = 1000;

// Generate a random 16-byte IV
export const generateIV = () =>
  CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);

// Derive key from master password (no salt for now)
export function generateKeyFromMasterPass(master_pass: string) {
  return CryptoJS.PBKDF2(master_pass, "", {
    keySize: KEY_SIZE,
    iterations: ITERATIONS,
  });
}

// Encrypt the password using AES
export function encryptPass({ pass, master_pass }: EncryptPassProps) {
  if (!pass || !master_pass) {
    throw new Error("Missing password or master password");
  }

  const IV = generateIV();
  const key = generateKeyFromMasterPass(master_pass);

  const encrypted = CryptoJS.AES.encrypt(pass, key, {
    iv: CryptoJS.enc.Hex.parse(IV), // ✅ lowercase 'iv'
  }).toString();

  return {
    encrypted,
    IV,
  };
}

// Decrypt the password using AES
export function decryptPass(
  encrypted: string,
  IV: string,
  master_pass: string
) {
  const key = generateKeyFromMasterPass(master_pass);
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: CryptoJS.enc.Hex.parse(IV), // ✅ lowercase 'iv'
  });

  const result = decrypted.toString(CryptoJS.enc.Utf8);
  if (!result) throw new Error("Incorrect master password");

  return result;
}
