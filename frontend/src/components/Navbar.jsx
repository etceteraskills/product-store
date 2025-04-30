import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { PlusSquareIcon } from "@chakra-ui/icons";
import React from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={14}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", sm: "row" }} // ✅ fixed this line
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems="center" mt={{ base: 2, sm: 0 }}>
          <Link to="/create">
            <Button>
              <PlusSquareIcon />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
