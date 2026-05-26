"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SlideUp } from "@/components/motion/SlideUp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInWithMagicLink } from "@/lib/actions/auth.actions";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAction(formData: FormData) {
    setIsLoading(true);
    const result = await signInWithMagicLink(formData);
    if (result?.error) {
      setMessage(result.error);
    } else {
      setMessage("Check your email for the magic link.");
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      
      <Container className="relative z-10">
        <SlideUp>
          <div className="mx-auto max-w-md">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-medium tracking-tighter text-zinc-100">Sign in to Gauge</h1>
              <p className="mt-4 text-zinc-500 tracking-wide">
                Automate your AI spend auditing and reclaim wasted capital.
              </p>
            </div>

            <form action={handleAction} className="space-y-6 bg-zinc-950 p-8 rounded-3xl border border-white/5 shadow-2xl">
              {message && (
                <div className="rounded-md bg-white/5 p-4 text-sm text-zinc-300">
                  {message}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
                  Email Address
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="founder@startup.com"
                  className="bg-zinc-900/50 border-white/5 text-zinc-100 placeholder:text-zinc-700 h-12"
                />
              </div>
              <Button disabled={isLoading} type="submit" className="w-full h-12 bg-zinc-100 text-zinc-900 hover:bg-zinc-300 transition-colors font-medium">
                {isLoading ? "Sending..." : "Continue with Email"}
              </Button>
            </form>
          </div>
        </SlideUp>
      </Container>
    </div>
  );
}
