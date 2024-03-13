const express = require("express");
const PatientController = require("../controller/PatientController");
const ProfessionalController = require("../controller/ProfessionalController");
const ProceduresController = require("../controller/ProceduresController");
const AppointmentController = require("../controller/AppointmentController");
const PaymentController = require("../controller/PaymentController");
const routes = express.Router();

//rotas para pacientes
routes.get("/odontcli/pacientes", PatientController.index); //lista todos os pacientes ||
routes.get("/odontcli/pacientes-por-nome", PatientController.showForName); //paciente específico pelo nome
routes.get("/odontcli/pacientes-por-cpf", PatientController.showForCpf); //paciente específico pelo nome
routes.get("/odontcli/pacientes/:id", PatientController.showForId); //paciente específico por ID
routes.post("/odontcli/pacientes", PatientController.store); //cria cadastro de paciente novo
routes.put("/odontcli/pacientes/:id", PatientController.put); //atualiza profissional
routes.delete("/odontcli/pacientes/:id", PatientController.delete); //apaga cadastro do paciente

//rotas para profissionais
routes.get("/odontcli/profissionais", ProfessionalController.index); //lista todos os profissionais cadastrados
routes.get("/odontcli/profissionais/:id", ProfessionalController.show); //profissional específico
routes.post("/odontcli/profissionais", ProfessionalController.store); //cria cadastro de profissional novo
routes.put("/odontcli/profissionais/:id", ProfessionalController.put); //atualiza dados do profissional
routes.delete("/odontcli/profissionais/:id", ProfessionalController.delete); //apaga cadastro do profissional

//rotas de procedimentos
routes.get("/odontcli/procedimentos", ProceduresController.index); //lista todos os procedimentos oferecidos pela clinica
routes.get("/odontcli/procedimentos/:id", ProceduresController.show); //informações sobre um procedimento específico
routes.post("/odontcli/procedimentos", ProceduresController.store); //cria cadastro de um procedimento novo
routes.put("/odontcli/procedimentos/:id", ProceduresController.put); //atualiza dados sobre um procedimento
routes.delete("/odontcli/procedimentos/:id", ProceduresController.delete); //apaga um procedimento

//rotas de agendamentos
routes.get("/odontcli/agendamentos", AppointmentController.index); //lista todos os agendamentos criados
routes.post("/odontcli/agendamentos", AppointmentController.store); //cria um agendamento novo
routes.get("/odontcli/agendamentos-do-paciente", AppointmentController.show); //informações sobre um agendamento específico
routes.put("/odontcli/agendamentos/:id", AppointmentController.put); //atualiza dados sobre um agendamento
routes.delete("/odontcli/agendamentos/:id", AppointmentController.delete); //apaga um agendamento

//rotas de pagamento
routes.get(
  "/odontcli/agendamentos/:appointmentId/pagamento",
  PaymentController.show
); //informações sobre um pagamento específico
routes.post(
  "/odontcli/agendamentos/:appointmentId/pagamento",
  PaymentController.store
); //cria um pagamento
routes.delete("/odontcli/pagamento/:id", PaymentController.delete); //apaga um pagamento( fins de teste, não será aplicado no build)

module.exports = routes;
