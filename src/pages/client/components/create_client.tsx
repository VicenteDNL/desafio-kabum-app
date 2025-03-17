import { toaster } from "../../../components/ui/toaster";
import { Box, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import React from "react";
import { clientOutput } from "../../../service/contracts/client_output";
import { clientInput } from "../../../service/contracts/client_input";
import { ClientService } from "../../../service/client_service";
import FormClient from "./form_client";

interface CreateClientProps {
  handle: (client: clientOutput) => void;
}

const CreateClient = ({ handle }: CreateClientProps) => {
  const handleCreateClient = async (clientInput: clientInput) => {
    try {
      var response = await ClientService.create(clientInput);
      if (response.status === "success") {
        toaster.create({
          title: response.message,
          type: "success",
        });
        handle(response.data);
        return true;
      } else {
        toaster.create({
          title: response.message,
          type: "error",
        });
        return false;
      }
    } catch (e) {
      toaster.create({
        title: "Ocorreu um erro ao criar cliente. Tente novamente",
        type: "error",
      });
      return false;
    }
  };
  return (
    <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Box display="flex" justifyContent="end">
          <Button
            size="sm"
            background="teal.500"
            variant="solid"
            mb={10}
            mt={5}
          >
            Adicionar novo cliente
          </Button>
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Cadastrar Cliente</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <FormClient
                handleConfirm={handleCreateClient}
                handleCancel={() => {}}
              ></FormClient>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CreateClient;
