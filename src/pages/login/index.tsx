import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Box,
  Button,
  Card,
  Heading,
  Input,
  Link as ChakraLink,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GoSignIn } from "react-icons/go";
import { PasswordInput } from "../../components/ui/password-input";
import { Link } from "react-router";
import { Toaster, toaster } from "../../components/ui/toaster";
import { ColorModeButton } from "../../components/ui/color-mode";
import { AuthService } from "../../service/auth_service";
import { useNavigate } from "react-router";
const LoginPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);

    AuthService.login({ email: email, password: password })

      .then((data) => {
        if (data.status === "success") {
          toaster.create({
            title: data.message,
            type: "success",
          });
          navigate("/");
        } else {
          toaster.create({
            title: data.message,
            type: "error",
          });
        }
      })
      .catch((e) => {
        toaster.create({
          title: "Ocorreu um erro ao realizar login. Tente novamente",
          type: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
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
            Login
          </Heading>
        </Card.Header>
        <Card.Body>
          <FormControl mb={20}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Insira seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={20}>
            <FormLabel>Senha</FormLabel>
            <PasswordInput
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            disabled={isLoading}
            colorPalette="teal"
            variant="solid"
            onClick={handleLogin}
          >
            {isLoading ? <Spinner /> : <GoSignIn />} Entrar
          </Button>
          <Box textAlign="center" mt={1}>
            <ChakraLink>
              <Link to="/register">Registra-se</Link>
            </ChakraLink>
          </Box>
        </Card.Body>
      </Card.Root>
      <Toaster />
    </Box>
  );
};

export default LoginPage;
