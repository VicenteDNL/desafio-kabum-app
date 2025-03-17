import { clientInput } from "@/service/contracts/client_input";
import { clientOutput } from "../../../service/contracts/client_output";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Button, Grid, GridItem, Input } from "@chakra-ui/react";
import React, { useState } from "react";

interface FormClientProps {
  handleConfirm: (client: clientInput) => Promise<boolean>;
  handleCancel: () => void;
  client?: clientOutput;
}

const FormClient = ({
  handleConfirm,
  handleCancel,
  client,
}: FormClientProps) => {
  const [isSaving, setSaving] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState(client?.date_of_birth ?? "");
  const [document, setDocument] = useState(client?.document ?? "");
  const [name, setName] = useState(client?.name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(client?.phone_number ?? "");
  const [generalRegistration, setGeneralRegistration] = useState(
    client?.general_registration ?? ""
  );
  const resetForm = () => {
    setDateOfBirth("");
    setDocument("");
    setName("");
    setPhoneNumber("");
    setGeneralRegistration("");
  };

  var handleConf = () => {
    setSaving(true);
    handleConfirm({
      date_of_birth: dateOfBirth,
      document: document,
      name: name,
      phone_number: phoneNumber,
      general_registration: generalRegistration,
    })
      .then((success) => {
        if (success) resetForm();
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <Box my={3} mx={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        <GridItem colSpan={2}>
          <FormControl mb={20}>
            <FormLabel>Nome</FormLabel>
            <Input
              required
              disabled={isSaving}
              placeholder="Nome completo"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <FormControl mb={20}>
          <FormLabel>CPF</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="N° do CPF"
            type="text"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
          />
        </FormControl>
        <FormControl mb={20}>
          <FormLabel>Data de nascimento</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="Data de nasc."
            type="text"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </FormControl>
        <FormControl mb={20}>
          <FormLabel>Telefone</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="(xx) x xxxx-xxxx"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormControl>
        <FormControl mb={20}>
          <FormLabel>Registro Geral</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="Insira seu RG"
            type="text"
            value={generalRegistration}
            onChange={(e) => setGeneralRegistration(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Box display="flex" justifyContent="end">
        <Button
          onClick={handleCancel}
          disabled={isSaving}
          size="sm"
          background="red.400"
          mr={2}
        >
          Cancelar
        </Button>

        <Button
          disabled={isSaving}
          size="sm"
          background="blue.400"
          mx={2}
          onClick={handleConf}
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormClient;
