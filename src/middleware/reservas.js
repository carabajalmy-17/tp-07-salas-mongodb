function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de Sala";
  next();
}
function validarReserva(req, res, next) {
  const estudiante = String(req.body.estudiante ?? "").trim();
  const email = String(req.body.email ?? "").trim();
  const sala = String(req.body.sala ?? "").trim();
  const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
  const fecha = String(req.body.fecha ?? "").trim();
  const turno = String(req.body.turno ?? "").trim();
  const turnosPermitidos = ["Mañana", "Tarde", "Noche"];
  const cantidadPersonas = Number(req.body.personas);

  const datosValidos =
    estudiante !== "" &&
    email !== "" &&
    email.includes("@") &&
    salasPermitidas.includes(sala) &&
    fecha !== "" &&
    turnosPermitidos.includes(turno) &&
    Number.isInteger(cantidadPersonas) &&
    cantidadPersonas >= 1 &&
    cantidadPersonas <= 6;

  if (!datosValidos) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva Reserva",
      error: "Completá todos los campos con valores válidos.",
      valores: req.body,
    });
  }

  req.reservaValidada = {
    estudiante,
    email,
    sala,
    fecha,
    turno,
    personas: cantidadPersonas,
  };

  next();
}
module.exports = { prepararAreaReservas, validarReserva };
