function crearControladorReservas(servicioReservas) {
  function listar(req, res) {
    res.render("reservas/lista", {
      titulo: "reservas realizadas",
      reservas: servicioReservas.listar(),
    });
  }

  function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
      titulo: "Nueva Reserva",
      error: null,
      valores: {},
    });
  }

  function mostrarDetalle(req, res) {
    const id = Number(req.params.id);
    const reserva = servicioReservas.obtenerPorId(id);

    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "reserva no encontrada",
        mensaje: "no se encontro reserva con ese identificador.",
      });
    }

    res.render("reservas/detalle", {
      titulo: reserva.estudiante,
      reserva,
    });
  }

  function crear(req, res) {
    servicioReservas.crear(req.reservaValidada);
    res.redirect("/reservas");
  }

  function listarApi(req, res) {
    res.json(servicioReservas.listar());
  }

  return { listar, mostrarFormulario, mostrarDetalle, crear, listarApi };
}

module.exports = { crearControladorReservas };
