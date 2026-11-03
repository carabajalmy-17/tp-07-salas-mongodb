const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");
const {
  crearIdentificadorSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");
const { crearControladorReservas } = require("./controladores/reservas");
const { crearRouterReservas } = require("./rutas/reservas");

function crearApp({ servicioReservas, formatoRegistro }) {
  const app = express();

  const controladorReservas = crearControladorReservas(servicioReservas);
  const reservasRouter = crearRouterReservas(controladorReservas);

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("layout", "layouts/main");

  app.use(morgan(formatoRegistro));
  app.use(crearIdentificadorSolicitud());
  app.use(medirDuracion);
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.get("/", (req, res) => {
    res.render("inicio", {
      titulo: "Reserva de Salas de Estudio",
    });
  });

  app.get("/estado", (req, res) => {
    res.status(200).json({
      estado: "OK",
      mensaje: "El servidor está funcionando correctamente.",
    });
  });

  app.get("/api/reservas", controladorReservas.listarApi);

  app.use("/reservas", reservasRouter);
  app.use((req, res, next) => {
    console.log("Solicitud recibida:", req.method, req.originalUrl);
    next();
  });

  app.use((req, res) => {
    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe.",
    });
  });

  return app;
}

module.exports = { crearApp };
