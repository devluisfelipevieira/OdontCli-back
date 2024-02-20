const Appointments = require("../models/Appointments");
const Patients = require("../models/Patients");
const Professionals = require("../models/Professionals");
const Procedures = require("../models/Procedures");
const { Op, where } = require("sequelize");

module.exports = {
  // GET ".../agendamentos"
  async index(req, res) {
    const { initialDate, endDate, professionalId } = await req.query; // Aqui é usado .query a requisição devolve paramêtros de URL(aqueles pós o "?" na URL)
    if (professionalId === undefined || professionalId === null) {
      return res
        .status(400)
        .json({ error: "O campo 'Profissional' é obrigatório" });
    }
    const appointments = await Appointments.findAll({
      where: {
        dateHour: { [Op.between]: [initialDate, endDate] },
        professionalId: professionalId,
      },
    });
    res.send(appointments);
  },

  //GET ".../agendamentos-por-paciente"
  async show(req, res) {
    const { patientId } = await req.query;
    const appointment = await Appointments.findAll({
      where: {
        patientId: patientId,
      },
    });
    if (appointment === null) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    return res.send(appointment);
  },

  // POST ".../agendamentos"
  async store(req, res) {
    const { patientId, professionalId, procedureId, dateHour } = req.body;

    if (!patientId || !professionalId || !procedureId || !dateHour) {
      return res.status(400).json({
        error: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const patient = await Patients.findByPk(patientId);
    const professional = await Professionals.findByPk(professionalId);
    const procedure = await Procedures.findByPk(procedureId);

    if (patient === null) {
      return res.status(404).json({ error: "Paciente não econtrado" });
    }
    if (professional === null) {
      return res.status(404).json({ error: "Profissional não econtrado" });
    }
    if (procedure === null) {
      return res.status(404).json({ error: "Procedimento não econtrado" });
    }

    const value = procedure.price;
    const patientName = patient.name;
    const professionalName = professional.name;
    const procedureName = procedure.name;

    try {
      const appointment = await Appointments.create({
        patientId,
        professionalId,
        procedureId,
        dateHour,
        value,
        patientName,
        professionalName,
        procedureName,
      });
      return res.json(appointment);
    } catch (error) {
      return res.send(`Não foi possivel criar agendamento\n ${error}`);
    }
  },

  // GET ".../agendamentos"
  async put(req, res) {
    const { patientId, professionalId, procedureId, dateHour } = req.body;

    const { id } = await req.params;
    const appointment = await Appointments.findByPk(id);

    if (appointment === null) {
      res.status(404).json({ error: "Agendamento não encontrado" });
    }

    if (!patientId || !professionalId || !procedureId || !dateHour) {
      return res.status(400).json({
        error: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const patient = await Patients.findByPk(patientId);
    const professional = await Professionals.findByPk(professionalId);
    const procedure = await Procedures.findByPk(procedureId);

    if (patient === null) {
      return res.status(404).json({ error: "Paciente não econtrado" });
    }
    if (professional === null) {
      return res.status(404).json({ error: "Profissional não econtrado" });
    }
    if (procedure === null) {
      return res.status(404).json({ error: "Procedimento não econtrado" });
    }

    try {
      await Appointments.update(
        {
          patientId,
          professionalId,
          procedureId,
          dateHour,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return res.send("Agendamento atualizado com sucesso!");
    } catch (error) {
      return res.send(`Algo deu errado\n ${error}`);
    }
  },

  // DELETE ".../agendamentos/id"
  async delete(req, res) {
    const appointment = await Appointments.findByPk(req.params.id);

    if (appointment === null) {
      return res
        .status(404)
        .json({ error: "Agendamento não consta no banco de dados" });
    }

    await Appointments.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send("Agendamento foi excluido com sucesso!");
  },
};
