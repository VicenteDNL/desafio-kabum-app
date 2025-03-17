import { toaster } from "../../../components/ui/toaster";
import { AddressService } from "../../../service/address_service";
import { addressOutput } from "../../../service/contracts/address_output";
import { Box, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import React from "react";
import FormAddreess from "./form_address";
import { addressInput } from "@/service/contracts/address_input ";
import { FaPlus } from "react-icons/fa6";

interface CreateAddressProps {
  clientId: number;
  handle: (address: addressOutput) => void;
}

const CreateAddress = ({ clientId, handle }: CreateAddressProps) => {
  const handleCreateAddress = async (address: addressInput) => {
    try {
      var response = await AddressService.create(clientId, address);
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
        return true;
      }
    } catch (e) {
      toaster.create({
        title: "Ocorreu um erro ao criar endereço do cliente. Tente novamente",
        type: "error",
      });
      return true;
    }
  };
  return (
    <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Box display="flex" justifyContent="center">
          <Button size="sm" colorPalette="teal" variant="solid" mb={10} mt={5}>
            <FaPlus />
            Adicionar novo endereço
          </Button>
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Cadastrar Endereço</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <FormAddreess
                handleConfirm={handleCreateAddress}
                handleCancel={() => {}}
              ></FormAddreess>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CreateAddress;
