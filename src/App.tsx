import {
  Box,
  Button,
  Heading,
  Popover,
  Portal,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "./components/ui/color-mode";
import { FaCircleUser, FaUserShield } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import Client from "./pages/client";
import { IoMdExit } from "react-icons/io";
import { AuthService } from "./service/auth_service";
import { useNavigate } from "react-router";
function App() {
  let navigate = useNavigate();
  var user = AuthService.getUser();
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={5}
        background="teal.500"
      >
        <Heading size="lg">Desafio Kabum</Heading>
        <Box>
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button size="sm" background="gray.400">
                <FaCircleUser />
              </Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body textAlign="center">
                    <Heading size="sm">{user?.name}</Heading>
                    <Text fontWeight="light">{user?.email}</Text>

                    <Button
                      size="xs"
                      background="gray.400"
                      mt={5}
                      onClick={() => {
                        AuthService.logout();
                        navigate("/login");
                      }}
                    >
                      <IoMdExit /> Sair
                    </Button>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
          <ColorModeButton></ColorModeButton>
        </Box>
      </Box>
      <Box m={10}>
        <Tabs.Root defaultValue="clients">
          <Tabs.List>
            <Tabs.Trigger value="clients">
              <FaUserFriends />
              Clientes
            </Tabs.Trigger>
            <Tabs.Trigger value="user">
              <FaUserShield />
              Usuários
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="user">Not implemented</Tabs.Content>
          <Tabs.Content value="clients">
            <Client></Client>
          </Tabs.Content>
          <Tabs.Content value="tasks">
            Manage your tasks for freelancers
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </>
  );
}

export default App;
