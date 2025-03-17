import { toaster } from "../../../components/ui/toaster";
import { AddressService } from "../../../service/address_service";
import React, { useState } from "react";
import { addressOutput } from "../../../service/contracts/address_output";
import { Box, Button, Collapsible, Table } from "@chakra-ui/react";
import CardAdrress from "./card_address";
import { clientOutput } from "@/service/contracts/client_output";
import CreateAddress from "./create_address";

interface AddressProps {
  addresses: addressOutput[];
  client: clientOutput;
}

const Address = ({ addresses, client }: AddressProps) => {
  const [isDeleting, setIsDeleting] = useState<number[]>([]);
  const [addressList, setAddressList] = useState<addressOutput[]>(addresses);
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreated = (address: addressOutput) => {
    setAddressList([...addressList, address]);
  };
  const handleDeleteAddress = (clientId: number, id: number) => {
    isDeleting.push(id);
    setIsDeleting(isDeleting);
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
        setIsDeleting(isDeleting.filter((d) => d !== id));
      });
  };

  return (
    <Table.Row key={client.id + "address"}>
      <Table.Cell p={0} colSpan={7}>
        <Collapsible.Root key={"c" + client.id} open={true}>
          <Collapsible.Content>
            {addressList.map((address) => {
              return (
                <CardAdrress
                  address={address}
                  client={client}
                  handleDeleteAddress={handleDeleteAddress}
                ></CardAdrress>
              );
            })}
          </Collapsible.Content>
        </Collapsible.Root>
        <Box>
          <Collapsible.Root
            onOpenChange={() => {
              setCreateOpen(true);
            }}
            onExitComplete={() => {
              setCreateOpen(false);
            }}
            mt={5}
            mb={10}
            flexDirection="column"
            display="flex"
            justifyContent="center"
            key={"createdAddress_" + client.id}
          >
            <Collapsible.Content>
              <CreateAddress
                handle={handleCreated}
                clientId={client.id}
              ></CreateAddress>
            </Collapsible.Content>

            {createOpen ? null : (
              <Collapsible.Trigger>
                <Button size="xs" colorPalette="teal" variant="solid">
                  Adicionar novo endereço
                </Button>
              </Collapsible.Trigger>
            )}
          </Collapsible.Root>
        </Box>
      </Table.Cell>
    </Table.Row>
  );
};

export default Address;
