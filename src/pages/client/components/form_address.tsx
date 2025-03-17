import { addressInput } from "@/service/contracts/address_input ";
import { addressOutput } from "@/service/contracts/address_output";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Button, Grid, GridItem, Input } from "@chakra-ui/react";
import React, { useState } from "react";

interface FormAddreessProps {
  handleConfirm: (address: addressInput) => Promise<boolean>;
  handleCancel: () => void;
  address?: addressOutput;
}

const FormAddreess = ({
  handleConfirm,
  handleCancel,
  address,
}: FormAddreessProps) => {
  const [isSaving, setSaving] = useState(false);
  const [street, setStreet] = useState(address?.street ?? "");
  const [number, setNumber] = useState(address?.number ?? "");
  const [complement, setComplement] = useState(address?.complement ?? "");
  const [neighborhood, setNeighborhood] = useState(address?.neighborhood ?? "");
  const [zip, setZip] = useState(address?.zip ?? "");
  const [state, setState] = useState(address?.state ?? "");
  const [city, setCity] = useState(address?.city ?? "");
  const [country, setCountry] = useState(address?.country ?? "");

  const resetForm = () => {
    setStreet("");
    setNumber("");
    setComplement("");
    setNeighborhood("");
    setZip("");
    setState("");
    setCity("");
    setCountry("");
  };

  var handleConf = () => {
    setSaving(true);
    handleConfirm({
      street: street,
      number: number,
      complement: complement,
      neighborhood: neighborhood,
      zip: zip,
      state: state,
      city: city,
      country: country,
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
            <FormLabel>Logradouro</FormLabel>
            <Input
              required
              disabled={isSaving}
              placeholder="Insira logradouro"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <FormControl mb={20}>
          <FormLabel>Numero</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="N°"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormControl>
        <FormControl mb={20}>
          <FormLabel>Complemento</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="Complemento"
            type="text"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
        </FormControl>
        <FormControl mb={20}>
          <FormLabel>Bairro</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="Bairro"
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </FormControl>
        <FormControl mb={20}>
          <FormLabel>CEP</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="Insira seu CEP"
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </FormControl>
        <FormControl mb={20}>
          <FormLabel>Cidade</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="Insira sua cidade"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormControl>
        <FormControl mb={20}>
          <FormLabel>Estado</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="Insira seu estado"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </FormControl>
        <FormControl mb={20}>
          <FormLabel>País</FormLabel>
          <Input
            required
            disabled={isSaving}
            placeholder="Insira seu país"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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

export default FormAddreess;
