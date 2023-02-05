"use client";

import { Flex, Image, Heading, Text } from "@chakra-ui/react";
import GoogleSignIn from "@/components/GoogleSignIn";

export default function LogInPage() {
    return (
        <Flex
            bg="#EAFDFC"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <Heading
                fontWeight={700}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                lineHeight={"110%"}
            >
                <Text as={"span"} color={"#107CF1"}>
                    Continue the
                </Text>
            </Heading>
            <Image
                src="/LogoSmall.png"
                boxSize="20%"
                objectFit="contain"
            ></Image>
            <GoogleSignIn />
        </Flex>
    );
}
