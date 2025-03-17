import { ColorModeButton } from "../../components/ui/color-mode";
import { Toaster } from "../../components/ui/toaster";
import { Box, Card, Heading, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      {" "}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <ColorModeButton></ColorModeButton>
        <Heading size="4xl" mb={30} textAlign="center">
          Desafio Kabum
        </Heading>
        <Card.Root>
          <Card.Header>
            <Heading size="lg" textAlign="center">
              Pagina não encontrada
            </Heading>
          </Card.Header>
          <Card.Body>
            <Box textAlign="center" mt={1}>
              <ChakraLink>
                <Link to="/">voltar para página inicial</Link>
              </ChakraLink>
            </Box>
          </Card.Body>
        </Card.Root>
        <Toaster />
      </Box>
    </>
  );
};

export default NotFound;
