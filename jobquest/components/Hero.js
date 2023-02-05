"use client";

import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    HStack,
    Image,
} from "@chakra-ui/react";

import Link from "next/link";

export default function Hero() {
    return (
        <>
            <Container maxW={"3xl"}>
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 10, md: 35 }}
                    alignItems="center"
                >
                    <Image
                        src="/LogoSmall.png"
                        boxSize="70%"
                        objectFit="cover"
                    ></Image>
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                        lineHeight={"110%"}
                    >
                        Find Your&nbsp;
                        <Text as={"span"} color={"#107CF1"}>
                            Dream Job
                        </Text>
                    </Heading>
                    <HStack
                        direction={"column"}
                        spacing={3}
                        align={"center"}
                        alignSelf={"center"}
                        position={"relative"}
                    >
                        <Link href="/login">
                            <Button
                                colorScheme={"blue"}
                                bg={"#107CF1"}
                                rounded={"full"}
                                w={"110px"}
                                px={6}
                                _hover={{
                                    bg: "#0A2647",
                                }}
                            >
                                Log In
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button
                                colorScheme={"blue"}
                                bg={"#107CF1"}
                                rounded={"full"}
                                w={"110px"}
                                px={6}
                                _hover={{
                                    bg: "#0A2647",
                                }}
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </HStack>
                </Stack>
            </Container>
        </>
    );
}
