const Payment = require("../models/Payment");
const Appointments = require("../models/Appointments");

module.exports = {
  // GET "...agendamentos/appointmentId/pagamento/:id"
  async show(req, res) {
    const { appointmentId } = await req.params;
    if (!appointmentId) {
      return res.send("Agendamento não encontrado no banco de dados");
    }

    try {
      const appointment = await Appointments.findByPk(appointmentId, {
        include: Payment,
      });
      return res.json(appointment);
    } catch (error) {
      res.send(`Não foi possivel encontrar o pagamento \n${error}`);
    }
  },

  // POST "...agendamentos/appointmentId/pagamento"
  async store(req, res) {
    const { appointmentId } = req.params;
    const payDate = new Date();

    const appointment = await Appointments.findByPk(appointmentId);

    if (appointment === null) {
      return res
        .status(404)
        .json({ error: "Agendamento não consta no banco de dados" });
    }

    const priceToPay = appointment.value;

    const { payMethod } = req.body;

    try {
      const payment = await Payment.create({
        appointmentId,
        payDate,
        priceToPay,
        payMethod,
      });
      await Appointments.update(
        {
          payed: true,
        },
        {
          where: {
            id: req.params.appointmentId,
          },
        }
      );
      return res.json(payment);
    } catch (error) {
      return res.send(`Não foi possivel criar pagamento\n ${error}`);
    }
  },

  // DELETE "...agendamentos/appointmentId/pagamento"
  async delete(req, res) {
    const payment = await Payment.findByPk(req.params.id);

    if (payment === null) {
      return res
        .status(404)
        .json({ error: "Pagamento não consta no banco de dados" });
    }

    await Payment.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send("Pagamento foi excluido com sucesso!");
  },
};
