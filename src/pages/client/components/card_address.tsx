import { addressOutput } from "@/service/contracts/address_output";
import { clientOutput } from "@/service/contracts/client_output";
import {
  Box,
  Card,
  DataList,
  IconButton,
  Dialog,
  Portal,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import EditAddress from "./edit_address";

interface CardAdrressProps {
  address: addressOutput;
  client: clientOutput;
  handleDeleteAddress: (clientId: number, id: number) => void;
}

export const CardAdrress = ({
  address,
  client,
  handleDeleteAddress,
}: CardAdrressProps) => {
  const [addressState, setAddressState] = useState<addressOutput>(address);

  return (
    <Card.Root my={3} mx={10}>
      <Card.Body>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DataList.Root size="sm">
            <DataList.Item>
              <DataList.ItemLabel>Logradouro</DataList.ItemLabel>
              <DataList.ItemValue>
                {`${addressState.street} - Nº ${addressState.number} | ${addressState.neighborhood}`}
              </DataList.ItemValue>
            </DataList.Item>

            <DataList.Item>
              <DataList.ItemLabel>Complemento</DataList.ItemLabel>
              <DataList.ItemValue>{addressState.complement}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
          <DataList.Root size="sm">
            <DataList.Item>
              <DataList.ItemLabel>CEP</DataList.ItemLabel>
              <DataList.ItemValue>{addressState.zip}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Cidade</DataList.ItemLabel>
              <DataList.ItemValue>
                {`${addressState.city} - ${addressState.state}  (${addressState.country})`}
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
          <Box>
            <EditAddress
              address={address}
              clientId={client.id}
              handle={(addressOutput) => {
                setAddressState(addressOutput);
              }}
            ></EditAddress>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <IconButton
                  m={1}
                  size="xs"
                  aria-label="delete"
                  background="gray.300"
                >
                  <MdDelete />
                </IconButton>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Confirmar exclusão</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      Realmente deseja excluir este endereço da(o){" "}
                      <b>{client.name}</b>?
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button size="sm" variant="outline">
                          Cancelar
                        </Button>
                      </Dialog.ActionTrigger>
                      <Dialog.ActionTrigger asChild>
                        <Button
                          size="sm"
                          background="red.400"
                          onClick={() =>
                            handleDeleteAddress(client.id, address.id)
                          }
                        >
                          Confirmar
                        </Button>
                      </Dialog.ActionTrigger>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </Box>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

export default CardAdrress;
