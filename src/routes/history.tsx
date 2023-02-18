import { Container, Text, Button } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

export default function History() {
  let { gameAddress, id } = useParams();
  return (
    <Container>
      <a
        href={`https://testnets.opensea.io/assets/goerli/${gameAddress}/${id}`}
        target="_blank"
      >
        Opensea
      </a>
    </Container>
  );
}
