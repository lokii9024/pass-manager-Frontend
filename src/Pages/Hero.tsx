import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="text-center max-w-2xl mx-auto mt-24 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Your Vault, Secured.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          A sleek, private, and encrypted password manager. Powered by modern encryption. You control your data.
        </p>
        <Button size="lg">
          Get Started <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </header>

      <section className="mt-16 grid gap-6 md:grid-cols-3 w-full max-w-5xl px-4 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Zero-Knowledge Encryption</CardTitle>
          </CardHeader>
          <CardContent>
            Your passwords are encrypted on your device before being sent — not even we can read them.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Source Backend</CardTitle>
          </CardHeader>
          <CardContent>
            Fully transparent and hosted by you. You're in control of storage and authentication.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Built with Modern Tools</CardTitle>
          </CardHeader>
          <CardContent>
            React, shadcn/ui, Vite, AES-GCM, MongoDB — fast, secure, and built for developers.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
