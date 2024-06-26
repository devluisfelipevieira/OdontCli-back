const Appointments = require("../../models/Appointments");
const Patients = require("../../models/Patients");

module.exports = {
  // GET ".../pacientes"
  async index(req, res) {
    const patients = await Patients.findAll();
    return res.json(patients);
  },

  // GET ".../pacientes-por-nome"
  async showForName(req, res) {
    const { name } = await req.query;

    try {
      const patient = await Patients.findAll({
        where: {
          name: name,
        },
      });
      if (patient === null || undefined) {
        return res
          .status(404)
          .json({ error: "Paciente não encontrado no banco de dados" });
      }
      return res.json(patient);
    } catch (error) {
      res.send(`Não foi possivel encontrar o paciente \n${error}`);
    }
  },
  // GET ".../pacientes-por-data"
  async showForBornDate(req, res) {
    const { bornDate } = await req.query;

    try {
      const patient = await Patients.findAll({
        where: {
          bornDate: bornDate,
        },
      });
      if (patient === null || undefined) {
        return res
          .status(404)
          .json({ error: "Paciente não encontrado no banco de dados" });
      }
      return res.json(patient);
    } catch (error) {
      res.send(`Não foi possivel encontrar o paciente \n${error}`);
    }
  },
  // GET ".../pacientes-por-cpf"
  async showForCpf(req, res) {
    const { cpf } = await req.query;

    try {
      const patient = await Patients.findAll({
        where: {
          cpf: cpf,
        },
      });
      if (patient === null || undefined) {
        return res
          .status(404)
          .json({ error: "Paciente não encontrado no banco de dados" });
      }
      return res.json(patient);
    } catch (error) {
      res.send(`Não foi possivel encontrar o paciente \n${error}`);
    }
  },

  //GET ".../pacientes/id"
  async showForId(req, res) {
    const { id } = req.params;
    try {
      const patient = await Patients.findByPk(id);
      if (patient === null || undefined || NaN) {
        return res
          .status(404)
          .json({ error: "Paciente não encontrado no banco de dados" });
      }
      return res.json(patient);
    } catch (error) {
      res.send(`Não foi possivel encontrar o paciente \n${error}`);
    }
  },

  // GET ".../pacientes/id/agendamentos"
  async showAppointments(req, res) {
    const { id } = await req.params;
    let patient = await Patients.findByPk(id);

    if (!patient) {
      return res.status(400).json({ error: "Paciente não encontrado" });
    }

    try {
      patient = await Patients.findByPk(id, {
        include: Appointments,
      });
      return res.json(patient);
    } catch (error) {
      res.send(`Algo deu errado na busca: \n${error}`);
    }
  },

  // POST ".../pacientes"
  async store(req, res) {
    const { name, bornDate, gender, cpf, city, phone, email } = req.body;

    // validando campos obrigatórios
    if (!name || !bornDate || !gender || !cpf || !city) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    try {
      const patients = await Patients.create({
        name: name.toUpperCase(),
        bornDate,
        gender,
        cpf,
        city,
        phone,
        email,
      });
      console.log(patients);
      return res.json(patients);
    } catch (error) {
      return res.send(
        `Não foi possivel criar o cadastro do paciente\n ${error}`
      );
    }
  },

  // PUT ".../pacientes/:id"
  async put(req, res) {
    const { name, bornDate, gender, cpf, city, phone, email } = req.body;

    const patient = await Patients.findByPk(req.params.id);

    if (patient === null || undefined) {
      return res.status(404).error("Paciente não consta no banco de dados");
    }

    if (!name || !bornDate || !gender || !city || !cpf) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    try {
      await Patients.update(
        {
          name: name.toUpperCase(),
          bornDate,
          gender,
          cpf,
          city,
          phone,
          email,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.send("Cadastro do paciente atualizado com sucesso!");
    } catch (error) {
      return res.send(`Algo deu errodo:\n ${error}`);
    }
  },

  // DELETE ".../pacientes/id"
  async delete(req, res) {
    const patient = await Patients.findByPk(req.params.id);

    if (patient === null) {
      return res
        .status(404)
        .json({ error: "Paciente não consta no banco de dados" });
    }

    await Patients.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send("Cadastro do Paciente foi excluido com sucesso!");
  },
};
