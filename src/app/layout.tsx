"use client"

import { Flex } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider"
import PrimaryNav from "@/_components/PrimaryNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Provider>
                    <Flex direction="column" minH="100vh">
                        <PrimaryNav />
                        <Flex flex="1" p={4}>
                            {children}
                        </Flex>
                    </Flex>
                </Provider>
            </body>
        </html>
    );
}
