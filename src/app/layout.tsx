"use client"

import { Flex } from "@chakra-ui/react";
import { Toaster } from '@/components/ui/toaster'
import { Provider as ChakraProvider } from "@/components/ui/provider"
import PrimaryNav from "@/_components/PrimaryNav";
import { store } from '@/_state/store';
import { Provider as ReduxProvider } from 'react-redux'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ChakraProvider>
                    <ReduxProvider store={store}>
                        <Flex direction="column" minH="100vh">
                            <PrimaryNav />
                            <Flex flex="1" p={4}>
                                {children}
                            </Flex>
                            <Toaster />
                        </Flex>
                    </ReduxProvider>
                </ChakraProvider>
            </body>
        </html>
    );
}
