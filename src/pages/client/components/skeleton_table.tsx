import { Skeleton, Table } from "@chakra-ui/react";
import React from "react";

const SkeletonTable = () => {
  return (
    <Table.Row key="skeleton-table">
      <Table.Cell>
        <Skeleton flex="1" height="5" variant="pulse"></Skeleton>
      </Table.Cell>
      <Table.Cell>
        <Skeleton flex="1" height="5" variant="pulse"></Skeleton>
      </Table.Cell>
      <Table.Cell>
        <Skeleton flex="1" height="5" variant="pulse"></Skeleton>
      </Table.Cell>
      <Table.Cell>
        <Skeleton flex="1" height="5" variant="pulse"></Skeleton>
      </Table.Cell>
      <Table.Cell>
        <Skeleton flex="1" height="5" variant="pulse"></Skeleton>
      </Table.Cell>
      <Table.Cell>
        <Skeleton flex="1" height="5" variant="pulse"></Skeleton>
      </Table.Cell>
      <Table.Cell>
        <Skeleton flex="1" height="5" variant="pulse"></Skeleton>
      </Table.Cell>
    </Table.Row>
  );
};

export default SkeletonTable;
