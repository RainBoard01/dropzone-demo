import {
  Group,
  Text,
  useMantineTheme,
  MantineTheme,
  TextInput,
  Stack,
  Divider,
} from "@mantine/core";
import { Upload, Files, X, Icon as TablerIcon } from "tabler-icons-react";
import { Dropzone, DropzoneStatus, PDF_MIME_TYPE } from "@mantine/dropzone";

import { extractText } from "./pdf/extractText";
import { toJSON } from "./pdf/toJSON";
import { useEffect, useState } from "react";

function getIconColor(status: DropzoneStatus, theme: MantineTheme): string {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Files {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: "none" }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />
    <div>
      <Text size="xl" inline>
        Arrastra documentos PDF aqui o haz click para seleccionarlos
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Agrega cuantos archivos quieras, cada archivo no debe exceder los 5mb
      </Text>
    </div>
  </Group>
);

export function Demo() {
  const [pdfs, setPdfs] = useState([]);
  const [data, setData] = useState([]);
  const [folioValue, setFolioValue] = useState("");
  const [estadoValue, setEstadoValue] = useState("");
  const [fechaRecepcionValue, setFechaRecepcionValue] = useState("");
  const [estadoRecepcionValue, setEstadoRecepcionValue] = useState("");
  const [nroRegistroValue, setNroRegistroValue] = useState("");
  const [rutArmadorValue, setRutArmadorValue] = useState("");
  const [nombreValue, setNombreValue] = useState("");
  const [nombreEmbarcacionValue, setNombreEmbarcacionValue] = useState("");
  const [fechaZarpeValue, setFechaZarpeValue] = useState("");
  const [caletaZarpeValue, setCaletaZarpeValue] = useState("");
  const [fechaDesembarqueValue, setFechaDesembarqueValue] = useState("");
  const [caletaDesembarqueValue, setCaletaDesembarqueValue] = useState("");
  const theme = useMantineTheme();

  useEffect(() => {
    if (pdfs.length > 0) {
      pdfs.map((pdf) =>
        extractText(pdf).then((res) => {
          console.log(
            res.items.map((item) => item.str).filter((item) => item.length > 1)
          );
          setData([
            toJSON(
              res.items
                .map((item) => item.str)
                .filter((item) => item.length > 1)
            ),
          ]);
        })
      );
    }
  }, [pdfs]);

  useEffect(() => {
    if (data.length > 0) {
      setFolioValue(data[0]?.datosReporte.folioSernapesca);
      setEstadoValue(data[0]?.datosReporte.estado);
      setFechaRecepcionValue(data[0]?.datosReporte.fechaRecepcion);
      setEstadoRecepcionValue(data[0]?.datosReporte.estadoRecepcion);
      setNroRegistroValue(data[0]?.datosArmadorEmbarcacionTitular.nRegistro);
      setRutArmadorValue(data[0]?.datosArmadorEmbarcacionTitular.rutArmador);
      setNombreValue(data[0]?.datosArmadorEmbarcacionTitular.nombreArmador);
      setNombreEmbarcacionValue(
        data[0]?.datosArmadorEmbarcacionTitular.nombreEmbarcacion
      );
      setFechaZarpeValue(data[0]?.datosZarpe.fecha);
      setCaletaZarpeValue(data[0]?.datosZarpe.caleta);
      setFechaDesembarqueValue(data[0]?.datosDesembarque.fecha);
      setCaletaDesembarqueValue(data[0]?.datosDesembarque.caleta);
    }
  }, [data]);

  return (
    <Stack>
      <Dropzone
        onDrop={async (files) => {
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              setPdfs((prevState) => [...prevState, reader.result]);
            };
            reader.readAsDataURL(file);
          });
        }}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={PDF_MIME_TYPE}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Stack>
        <Divider label="Datos Reporte" labelPosition="center" mb={-15} />
        <Group>
          <TextInput
            value={folioValue}
            onChange={(e) => setFolioValue(e.target.value)}
            placeholder="12345678"
            label="Folio Sernapesca"
            required
          />
          <TextInput
            value={fechaRecepcionValue}
            onChange={(e) => setFechaRecepcionValue(e.target.value)}
            placeholder="01-01-2020 00:00"
            label="Fecha Recepción"
            required
          />
          <TextInput
            value={estadoValue}
            onChange={(e) => setEstadoValue(e.target.value)}
            placeholder="VENCIDO"
            label="Estado"
            required
          />
          <TextInput
            value={estadoRecepcionValue}
            onChange={(e) => setEstadoRecepcionValue(e.target.value)}
            placeholder="NORMAL"
            label="Estado Recepción"
            required
          />
        </Group>
        <Divider
          label="Datos Armador/Embarcación"
          labelPosition="center"
          mb={-15}
          mt={15}
        />
        <Group>
          <TextInput
            value={nroRegistroValue}
            onChange={(e) => setNroRegistroValue(e.target.value)}
            placeholder="123456"
            label="Nro Registro"
            required
          />
          <TextInput
            value={rutArmadorValue}
            onChange={(e) => setRutArmadorValue(e.target.value)}
            placeholder="123456789-0"
            label="Rut Armador"
            required
          />
          <TextInput
            value={nombreValue}
            onChange={(e) => setNombreValue(e.target.value)}
            placeholder="PEPITO JUAN PEREZ PEREZ"
            label="Nombre"
            required
          />
          <TextInput
            value={nombreEmbarcacionValue}
            onChange={(e) => setNombreEmbarcacionValue(e.target.value)}
            placeholder="SANTA MARIA"
            label="Nombre Embarcación"
            required
          />
        </Group>
        <Divider
          label="Datos Zarpe/Desembarque"
          labelPosition="center"
          mb={-15}
          mt={15}
        />
        <Group>
          <TextInput
            value={fechaZarpeValue}
            onChange={(e) => setFechaZarpeValue(e.target.value)}
            placeholder="01-01-2020 00:00"
            label="Fecha Zarpe"
            required
          />
          <TextInput
            value={caletaZarpeValue}
            onChange={(e) => setCaletaZarpeValue(e.target.value)}
            placeholder="Valparaíso"
            label="Caleta Zarpe"
            required
          />
          <TextInput
            value={fechaDesembarqueValue}
            onChange={(e) => setFechaDesembarqueValue(e.target.value)}
            placeholder="01-01-2020 00:00"
            label="Fecha Desembarque"
            required
          />
          <TextInput
            value={caletaDesembarqueValue}
            onChange={(e) => setCaletaDesembarqueValue(e.target.value)}
            placeholder="Valparaíso"
            label="Caleta Desembarque"
            required
          />
        </Group>
      </Stack>
    </Stack>
  );
}
