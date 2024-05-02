const Procedures = require("../models/Procedures");

module.exports = {
  // GET ".../procedimentos"
  async index(req, res) {
    const procedures = await Procedures.findAll();
    return res.json(procedures);
  },

  // POST ".../procedimentos"
  async store(req, res) {
    const { name, description, price } = req.body;

    // validando campos obrigatórios
    if (!name || !description || !price) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    try {
      const procedures = await Procedures.create({
        name,
        description,
        price,
      });
      return res.json(procedures);
    } catch (error) {
      return res.send(
        `Não foi possivel criar o cadastro do procedimento\n ${error}`
      );
    }
  },

  // GET ".../procedimentos/:id"
  async show(req, res) {
    const { id } = await req.params;

    try {
      const procedure = await Procedures.findByPk(id);
      if (procedure === null) {
        return res.send("Procedimento não encontrado no banco de dados");
      }
      return res.json(procedure);
    } catch (error) {
      res.send(`Não foi possivel encontrar o procedimento \n${error}`);
    }
  },

  // PUT ".../profissionais/:id"
  async put(req, res) {
    const { name, description, price } = req.body;

    const procedure = await Procedures.findByPk(req.params.id);

    if (procedure === null) {
      return res
        .status(404)
        .json({ error: "Procedimento não consta no banco de dados" });
    }

    // validando campos obrigatórios
    if (!name || !description || !price) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    try {
      await Procedures.update(
        { name, description, price },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.send("Cadastro do procedimento atualizado com sucesso!");
    } catch (error) {
      return res.send(`Algo deu errodo:\n ${error}`);
    }
  },

  async delete(req, res) {
    const procedure = await Procedures.findByPk(req.params.id);

    if (procedure === null) {
      return res
        .status(404)
        .json({ error: "Procedimento não consta no banco de dados" });
    }

    await Procedures.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send("Cadastro do Procedimento foi excluido com sucesso!");
  },
};
