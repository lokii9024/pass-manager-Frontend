import CryptoJS from "crypto-js";

type EncryptPassProps = {
  pass: string;
  master_pass: string;
};

const KEY_SIZE = 256 / 32; // AES key size in bytes
const ITERATIONS = 1000; // Number of iterations for key derivation

// Generate random 16-byte salt and IV
export const generateIV = () => CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);

export function generateKeyFromMasterPass(master_pass: string) {
  const key = CryptoJS.PBKDF2(master_pass, "", {
    keySize: KEY_SIZE,
    iterations: ITERATIONS,
  });
  return key;
}
// Function to encrypt a password using AES encryption

export function encryptPass({ pass, master_pass }: EncryptPassProps) {
  if (!pass || !master_pass) {
    console.error("Missing password or master password");
    return;
  }

  const IV = generateIV();
  const key = generateKeyFromMasterPass(master_pass);
  const encrypted = CryptoJS.AES.encrypt(pass, key, {
    iv: CryptoJS.enc.Hex.parse(IV),
  }).toString();

  return {
    encrypted,
    IV,
  };
}

// Function to decrypt a password using AES decryption
export function decryptPass(
  encrypted: string,
  IV: string,
  master_pass: string
) {
  const key = generateKeyFromMasterPass(master_pass);
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    IV: CryptoJS.enc.Hex.parse(IV),
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
