import firebase from "@/firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const auth = firebase.auth();
const Links = ["Home", "Tracker", "Searcher", "Forum"];

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("#107CF1", "#107CF1"),
        }}
        href={"#"}
    >
        {children}
    </Link>
);

export default function Navbar() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user] = useAuthState(firebase.auth());

    return (
        <>
            {user && (
                <Box bg={"#EAFDFC"} px={5}>
                    <Flex
                        h={16}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <IconButton
                            size={"md"}
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label={"Open Menu"}
                            display={{ md: "none" }}
                            onClick={isOpen ? onClose : onOpen}
                            bg="#fff"
                        />
                        <HStack spacing={8} alignItems={"center"}>
                            <Image
                                src="/LogoSmall.png"
                                boxSize="15%"
                                objectFit="contain"
                            ></Image>
                            <HStack
                                as={"nav"}
                                spacing={4}
                                display={{ base: "none", md: "flex" }}
                            >
                                {Links.map((link) => (
                                    <NavLink key={link}>{link}</NavLink>
                                ))}
                            </HStack>
                        </HStack>
                        <Flex alignItems={"center"}>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                    minW={0}
                                >
                                    <Avatar
                                        size={"sm"}
                                        src={
                                            "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Settings</MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            signOut(auth)
                                                .then(() => {
                                                    router.push("/");
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        }}
                                    >
                                        Sign Out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>

                    {isOpen ? (
                        <Box pb={4} display={{ md: "none" }}>
                            <Stack as={"nav"} spacing={4}>
                                {Links.map((link) => (
                                    <NavLink key={link}>{link}</NavLink>
                                ))}
                            </Stack>
                        </Box>
                    ) : null}
                </Box>
            )}
        </>
    );
}
