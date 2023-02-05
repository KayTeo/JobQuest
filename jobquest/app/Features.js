"use client";

import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FcBusiness, FcTodoList, FcConferenceCall } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
    return (
        <Stack align={"center"} justify={"center"}>
            <Flex
                w={16}
                h={16}
                align={"center"}
                justify={"center"}
                color={"white"}
                rounded={"full"}
                bg={"white"}
                mb={1}
            >
                {icon}
            </Flex>
            <Text align={"center"} fontWeight={600}>
                {title}
            </Text>
            <Text align={"center"} color={"black"}>
                {text}
            </Text>
        </Stack>
    );
};

export default function Features() {
    return (
        <Box p={4} w={"70%"}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Feature
                    icon={<Icon as={FcBusiness} w={10} h={10} />}
                    title={"Job Searcher"}
                    text={
                        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                    }
                />
                <Feature
                    icon={<Icon as={FcTodoList} w={10} h={10} />}
                    title={"Job Tracker"}
                    text={
                        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                    }
                />
                <Feature
                    icon={<Icon as={FcConferenceCall} w={10} h={10} />}
                    title={"Forum"}
                    text={
                        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                    }
                />
            </SimpleGrid>
        </Box>
    );
}
