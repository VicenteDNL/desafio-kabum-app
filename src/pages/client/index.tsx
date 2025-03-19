import { clientOutput } from "../../service/contracts/client_output";
import { ClientService } from "../../service/client_service";
import { Alert, Box, Table } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Toaster } from "../../components/ui/toaster";
import SkeletonTableClient from "./components/skeleton_table_clients";
import ClienteItem from "./components/client_item";
import CreateClient from "./components/create_client";

const Client = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<clientOutput[]>([]);

  var handleDeletedClient = (id: number) => {
    console.log(clients);
    var news = clients.filter((c) => c.id !== id);
    setClients([...news]);
    console.log(clients);
    console.log(news);
  };

  useEffect(() => {
    ClientService.getAll()
      .then((response) => {
        if (response.status === "success") {
          setClients(response.data);
        } else {
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (
    <SkeletonTableClient></SkeletonTableClient>
  ) : (
    <>
      <CreateClient
        handle={(c) => {
          setClients([...clients, c]);
        }}
      ></CreateClient>
      <Table.Root size="md" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>
              <b>#</b>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <b>Nome</b>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <b>CPF</b>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <b>Data de Nasc.</b>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <b>RG</b>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <b>Telefone</b>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <b>Ações</b>
            </Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.length === 0 ? (
            <Table.Row key="empty">
              <Table.Cell colSpan={8}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Alert.Root status="warning" width={300}>
                    <Alert.Indicator />
                    <Alert.Title>Nenhum cliente cadastrado.</Alert.Title>
                  </Alert.Root>
                </Box>
              </Table.Cell>
            </Table.Row>
          ) : (
            clients.map((client) => {
              return (
                <ClienteItem
                  key={client.id}
                  client={client}
                  handleDeletedClient={handleDeletedClient}
                ></ClienteItem>
              );
            })
          )}
        </Table.Body>
      </Table.Root>
      <Toaster />
    </>
  );
};

export default Client;
