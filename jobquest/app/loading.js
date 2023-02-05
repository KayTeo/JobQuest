"use client";

import { Flex, CircularProgress } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Flex
            bg="#EAFDFC"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <CircularProgress isIndeterminate color="#107CF1" />
        </Flex>
    );
}
