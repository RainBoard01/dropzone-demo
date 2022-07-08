export const toJSON = (words) => ({
  titulo: words[43],
  datosReporte: {
    folioSernapesca: words[1],
    estado: words[3],
    estadoRecepcion: words[5],
    fechaRecepcion: words[7],
  },
  datosArmadorEmbarcacionTitular: {
    nRegistro: words[10],
    region: words[18],
    rutArmador: words[19],
    matricula: words[12],
    puerto: words[16],
    nombreArmador: `${words[21]} ${words[22]}`,
    nombreEmbarcacion: words[14],
  },
  datosZarpe: {
    fecha: words[26],
    region: words[28],
    comuna: words[30],
    caleta: words[32],
  },
  datosDesembarque: {
    fecha: words[38],
    region: words[39],
    comuna: words[40],
    caleta: words[41],
  },
});
