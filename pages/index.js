import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ width: "50%", textAlign: "center" }}>
        <Image
          src="/imagenIndex.png"
          height={250}
          width={250}
          alt="Inicio whatsapp"
        />
        <h2 style={{ color: "#727372" }}>Manten tu teléfono conectado</h2>
        <p style={{ color: "#b7b9bb" }}>
          Whatsapp se conecta a tu teléfono para sincronizar los mensajes. A fin
          de reducir el consumo de datos, conecta el teléfono a una red Wi-fi.
        </p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  width: 100%;
  height: 100%;
`;
