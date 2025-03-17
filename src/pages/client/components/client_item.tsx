import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Collapsible,
  Dialog,
  IconButton,
  Portal,
  Table,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { clientOutput } from "../../../service/contracts/client_output";
import { ClientService } from "../../../service/client_service";
import { toaster } from "../../../components/ui/toaster";
import SkeletonTable from "./skeleton_table";
import CardAdrress from "./card_address";
import CreateAddress from "./create_address";
import { addressOutput } from "../../..//service/contracts/address_output";
import { AddressService } from "../../../service/address_service";
import EditClient from "./edit_client";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

interface ClienteItemProps {
  client: clientOutput;
  handleDeletedClient: (id: number) => void;
}

const ClienteItem = ({ handleDeletedClient, client }: ClienteItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [clientState, setClientState] = useState(client);
  const [addressList, setAddressList] = useState<addressOutput[]>(
    client.addresses
  );

  const handleCreated = (address: addressOutput) => {
    setAddressList([...addressList, address]);
  };

  const handleDeleteAddress = (clientId: number, id: number) => {
    setIsDeleting(true);
    AddressService.delete(clientId, id)
      .then((response) => {
        if (response.status === "success") {
          toaster.create({
            title: response.message,
            type: "success",
          });
          setAddressList(addressList.filter((a) => a.id !== id));
        } else {
          toaster.create({
            title: response.message,
            type: "error",
          });
        }
      })
      .catch(() => {
        toaster.create({
          title:
            "Ocorreu um erro ao deletar endereço do client. Tente novamente",
          type: "error",
        });
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleDeleteClient = (id: number) => {
    setIsDeleting(true);
    ClientService.delete(id)
      .then((response) => {
        if (response.status === "success") {
          toaster.create({
            title: response.message,
            type: "success",
          });
          handleDeletedClient(id);
        } else {
          toaster.create({
            title: response.message,
            type: "error",
          });
        }
      })
      .catch(() => {
        toaster.create({
          title: "Ocorreu um erro ao deletar cliente. Tente novamente",
          type: "error",
        });
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return isDeleting ? (
    <SkeletonTable></SkeletonTable>
  ) : (
    <>
      <Table.Row key={clientState.id}>
        <Table.Cell>{clientState.id}</Table.Cell>
        <Table.Cell>{clientState.name}</Table.Cell>
        <Table.Cell>{clientState.date_of_birth}</Table.Cell>
        <Table.Cell>{clientState.document}</Table.Cell>
        <Table.Cell>{clientState.general_registration}</Table.Cell>
        <Table.Cell>{clientState.phone_number}</Table.Cell>
        <Table.Cell>
          <EditClient
            client={client}
            handle={(c) => {
              setClientState(c);
            }}
          ></EditClient>
          <IconButton m={1} size="xs" aria-label="view" background="cyan.500">
            <FaEye />
          </IconButton>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <IconButton
                m={1}
                size="xs"
                aria-label="delete"
                background="red.400"
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
                    Realmente deseja excluir o cliente <b>{client.name}</b>?
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
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        Confirmar
                      </Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Table.Cell>
        <Table.Cell>
          <IconButton
            m={2}
            color="gray.300"
            aria-label="expanded"
            variant="ghost"
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? (
              <IoIosArrowDropupCircle />
            ) : (
              <IoIosArrowDropdownCircle />
            )}
          </IconButton>
        </Table.Cell>
      </Table.Row>
      <Table.Row key={client.id + "address"}>
        <Table.Cell p={0} colSpan={8}>
          <Collapsible.Root key={"c" + client.id} open={expanded}>
            <Collapsible.Content>
              {addressList.length === 0 ? (
                <Box
                  m={5}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Alert.Root status="warning" width={300}>
                    <Alert.Indicator />
                    <Alert.Title>Nenhum endereço cadastrado.</Alert.Title>
                  </Alert.Root>
                </Box>
              ) : (
                addressList.map((address) => {
                  return (
                    <CardAdrress
                      address={address}
                      client={client}
                      handleDeleteAddress={handleDeleteAddress}
                    ></CardAdrress>
                  );
                })
              )}
              <CreateAddress
                handle={handleCreated}
                clientId={client.id}
              ></CreateAddress>
            </Collapsible.Content>
          </Collapsible.Root>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default ClienteItem;
