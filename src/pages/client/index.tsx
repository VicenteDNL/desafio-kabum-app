import { clientOutput } from "../../service/contracts/client_output";
import { ClientService } from "../../service/client_service";
import { Table } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Toaster } from "../../components/ui/toaster";
import SkeletonTableClient from "./components/skeleton_table_clients";
import ClienteItem from "./components/client_item";
import CreateClient from "./components/create_client";

const Client = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<clientOutput[]>([]);

  var handleDeletedClient = (id: number) => {
    var news = clients.filter((c) => c.id !== id);
    setClients(news);
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
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>Nome</Table.ColumnHeader>
            <Table.ColumnHeader>Data de Nasc.</Table.ColumnHeader>
            <Table.ColumnHeader>CPF</Table.ColumnHeader>
            <Table.ColumnHeader>RG</Table.ColumnHeader>
            <Table.ColumnHeader>Telefone</Table.ColumnHeader>
            <Table.ColumnHeader>Ações</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((client) => {
            return (
              <ClienteItem
                client={client}
                handleDeletedClient={handleDeletedClient}
              ></ClienteItem>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Toaster />
    </>
  );
};

export default Client;
