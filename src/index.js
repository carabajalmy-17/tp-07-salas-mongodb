const path = require("node:path");

const { leerReservas } = require("./archivos");
const { leerConfiguracion } = require("./config/entorno");

const { crearServicioReservas } = require("./servicios/reservas");
const { crearApp } = require("./app");

const ruta = path.join(__dirname, "..", "reservas", "reservas.json");

async function main() {
  console.log("Iniciando aplicación...");

  const { puerto, formatoRegistro } = leerConfiguracion();
  const reservasIniciales = await leerReservas(ruta);
  const servicioReservas = crearServicioReservas(reservasIniciales);
  const app = crearApp({ servicioReservas, formatoRegistro });

  app.listen(puerto, () => {
    console.log(`servidor funcionando en http://localhost:${puerto}`);
  });
}
main().catch((error) => {
  console.error("no se pudo inciar la aplicacion", error);
  process.exitCode = -1;
});
