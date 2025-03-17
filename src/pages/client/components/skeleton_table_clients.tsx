import { Skeleton } from "@chakra-ui/react";
import React from "react";

const SkeletonTableClient = () => {
  return (
    <>
      <Skeleton flex="1" height="5" variant="pulse" my={2} />
      <Skeleton flex="1" height="5" variant="pulse" my={2} />
      <Skeleton flex="1" height="5" variant="pulse" my={2} />
      <Skeleton flex="1" height="5" variant="pulse" my={2} />
      <Skeleton flex="1" height="5" variant="pulse" my={2} />
    </>
  );
};

export default SkeletonTableClient;
