"use client";

import { Flex } from "@chakra-ui/react";
import Hero from "@/app/Hero";
import Features from "@/app/Features";

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
