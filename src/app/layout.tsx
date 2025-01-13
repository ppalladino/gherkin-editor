"use client"

// import "./globals.css"; 

import { Provider } from "@/components/ui/provider"
import PrimaryNav from "@/_components/PrimaryNav";

import { Button } from "@/components/ui/button"
import { Container, Heading, HStack, Text } from "@chakra-ui/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Container>
            <PrimaryNav />
            <main>{children}</main>
          </Container>
        </Provider>
      </body>
    </html>
  );
}
