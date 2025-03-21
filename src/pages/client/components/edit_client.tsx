import { CloseButton, Dialog, IconButton, Portal } from "@chakra-ui/react";
import React, { useState } from "react";
import FormClient from "./form_client";
import { MdEditSquare } from "react-icons/md";
import { clientOutput } from "../../../service/contracts/client_output";
import { ClientService } from "../../../service/client_service";
import { clientInput } from "../../../service/contracts/client_input";
import { toaster } from "../../../components/ui/toaster";

interface EditClientProps {
  client: clientOutput;
  handle: (client: clientOutput) => void;
}
const EditClient = ({ client, handle }: EditClientProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleUpdateClient = async (clientInput: clientInput) => {
    try {
      var response = await ClientService.update(client.id, clientInput);
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
        title: "Ocorreu um erro ao editar cliente. Tente novamente",
        type: "error",
      });
      return false;
    }
  };
  return (
    <Dialog.Root
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
      open={openDialog}
    >
      <Dialog.Trigger asChild>
        <IconButton
          m={1}
          size="xs"
          aria-label="edit"
          background="orange.400"
          onClick={() => {
            setOpenDialog(!openDialog);
          }}
        >
          <MdEditSquare />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Editar Cliente</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <FormClient
                handleConfirm={handleUpdateClient}
                handleCancel={() => {
                  setOpenDialog(false);
                }}
                client={client}
              ></FormClient>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default EditClient;
