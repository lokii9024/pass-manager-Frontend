import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lock, KeyRound, AlertTriangle } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">How it works</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        <Card>
          <CardHeader className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <CardTitle>Client-Side Encryption</CardTitle>
          </CardHeader>
          <CardContent>
            Passwords are encrypted in the browser using AES-GCM before they are ever sent to the server. Only you hold the key.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-3">
            <KeyRound className="w-6 h-6 text-primary" />
            <CardTitle>Master Password Protection</CardTitle>
          </CardHeader>
          <CardContent>
            Your master password derives a unique encryption key using PBKDF2. This key never leaves your device.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-primary" />
            <CardTitle>Zero-Knowledge Backend</CardTitle>
          </CardHeader>
          <CardContent>
            The backend never sees your plaintext passwords. It simply stores encrypted blobs tied to your user ID.
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-16 mb-4">User Precautions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
        <Card>
          <CardHeader className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <CardTitle>Never Share Your Master Password</CardTitle>
          </CardHeader>
          <CardContent>
            Your master password is the only way to decrypt your data. If you lose it, no one (including us) can recover your passwords.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <CardTitle>Use a Strong Master Password</CardTitle>
          </CardHeader>
          <CardContent>
            Choose a unique, strong passphrase that you can remember. Avoid short, common, or reused passwords.
          </CardContent>
        </Card>
      </div>

      <p className="mt-12 max-w-2xl text-center text-muted-foreground">
        VaultSafe is designed to put your security and privacy first. All cryptographic operations happen in your browser — ensuring that only <strong>you</strong> can decrypt your data.
      </p>
    </div>
  );
}
