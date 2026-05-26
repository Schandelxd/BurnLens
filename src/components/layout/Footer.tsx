import * as React from "react";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-tight">Gauge</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gauge, Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
