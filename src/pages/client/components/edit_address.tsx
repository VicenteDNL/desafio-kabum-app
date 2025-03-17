import { addressOutput } from "../../../service/contracts/address_output";
import { CloseButton, Dialog, IconButton, Portal } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import FormAddreess from "./form_address";
import { addressInput } from "../.././../service/contracts/address_input ";
import { toaster } from "../../../components/ui/toaster";
import { AddressService } from "../../../service/address_service";

interface EditAddressProps {
  address: addressOutput;
  clientId: number;
  handle: (address: addressOutput) => void;
}

const EditAddress = ({ address, clientId, handle }: EditAddressProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdateAddress = async (addressInput: addressInput) => {
    try {
      var response = await AddressService.update(
        clientId,
        address.id,
        addressInput
      );
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
        title: "Ocorreu um erro ao editar endereço do cliente. Tente novamente",
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
          background="gray.300"
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
              <Dialog.Title>Editar Endereço</Dialog.Title>
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
              <FormAddreess
                handleConfirm={handleUpdateAddress}
                handleCancel={() => {
                  setOpenDialog(false);
                }}
                address={address}
              ></FormAddreess>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default EditAddress;
