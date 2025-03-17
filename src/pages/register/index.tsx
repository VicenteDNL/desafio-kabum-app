import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Button, Card, Heading, Input, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdInput } from "react-icons/md";
import { PasswordInput } from "../../components/ui/password-input";
import { ColorModeButton } from "../../components/ui/color-mode";
import { AuthService } from "../../service/auth_service";
import { Toaster, toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router";
const RegisterPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    AuthService.register({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    })
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
      .catch((_) => {
        toaster.create({
          title: "Ocorreu um erro ao registrar conta. Tente novamente",
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
            Registra-se
          </Heading>
        </Card.Header>
        <Card.Body>
          <FormControl mb={20}>
            <FormLabel>Nome</FormLabel>
            <Input
              required
              placeholder="Nome completo"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl mb={20}>
            <FormLabel>Email</FormLabel>
            <Input
              required
              placeholder="Insira seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={20}>
            <FormLabel>Senha</FormLabel>
            <PasswordInput
              required
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl mb={20}>
            <FormLabel>Confirme a senha</FormLabel>
            <PasswordInput
              required
              placeholder="Repita sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button colorPalette="teal" variant="solid" onClick={handleRegister}>
            {isLoading ? <Spinner /> : <MdInput />}Registrar
          </Button>
        </Card.Body>
      </Card.Root>
      <Toaster />
    </Box>
  );
};

export default RegisterPage;
