"use client";

import { Flex } from "@chakra-ui/react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Main() {
    return (
        <Flex
            bg="#EAFDFC"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <Hero />
            <Features />
        </Flex>
    );
}
