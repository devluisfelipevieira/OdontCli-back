const Appointments = require("../models/Appointments");
const Professionals = require("../models/Professionals");

module.exports = {
  // GET ".../profissionais"
  async index(req, res) {
    const professionals = await Professionals.findAll();
    return res.json(professionals);
  },

  // POST ".../profissionais"
  async store(req, res) {
    const { name, gender, cro, specialty, phone, email } = req.body;

    // validando campos obrigatórios
    if (!name || !gender || !cro || !specialty || !phone || !email) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    try {
      const professionals = await Professionals.create({
        name,
        gender,
        cro,
        specialty,
        phone,
        email,
      });
      return res.json(professionals);
    } catch (error) {
      return res.send(
        `Não foi possivel criar o cadastro do profissional\n ${error}`
      );
    }
  },

  // GET ".../profissionais/:id"
  async show(req, res) {
    const { id } = await req.params;

    try {
      const professional = await Professionals.findByPk(id);
      if (professional === null) {
        return res.send("Profissional não encontrado no banco de dados");
      }
      return res.json(professional);
    } catch (error) {
      res.send(`Não foi possivel encontrar o profissional \n${error}`);
    }
  },

  // GET ".../profissionais/id/agendamentos"
  async showAppointments(req, res) {
    const { id } = await req.params;
    let professional = await Professionals.findByPk(id);

    if (!professional) {
      return res.status(400).json({ error: "Profissional não encontrado" });
    }

    try {
      professional = await Professionals.findByPk(id, {
        include: Appointments,
      });
      return res.json(professional);
    } catch (error) {
      res.send(`Algo deu errado na busca: \n${error}`);
    }
  },

  // PUT ".../profissionais/:id"
  async put(req, res) {
    const { name, gender, cro, specialty, phone, email } = req.body;

    const professional = await Professionals.findByPk(req.params.id);

    if (professional === null) {
      return res
        .status(404)
        .json({ error: "Profissional não consta no banco de dados" });
    }

    // validando campos obrigatórios
    if (!name || !gender || !cro || !specialty || !phone || !email) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    try {
      await Professionals.update(
        { name, gender, cro, specialty, phone, email },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.send("Cadastro do profissional atualizado com sucesso!");
    } catch (error) {
      return res.send(`Algo deu errodo:\n ${error}`);
    }
  },

  async delete(req, res) {
    const professional = await Professionals.findByPk(req.params.id);

    if (professional === null) {
      return res
        .status(404)
        .json({ error: "Profissional não consta no banco de dados" });
    }
    await Professionals.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send("Cadastro do Profissional foi excluido com sucesso!");
  },
};
