const Patients = require("../../models/Patients");
const Professionals = require("../../models/Professionals");
const Procedures = require("../../models/Procedures");
const Appointments = require("../../models/Appointments");
const Payment = require("../../models/Payment");

Patients.hasMany(Appointments, { onDelete: "CASCADE", onUpdate: "CASCADE" });

Professionals.hasMany(Appointments, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Procedures.hasMany(Appointments, { onDelete: "CASCADE", onUpdate: "CASCADE" });

Appointments.hasOne(Payment, { onDelete: "CASCADE", onUpdate: "CASCADE" });
//

Appointments.belongsTo(Patients, { foreignKey: "patientId", as: "patient" });

Appointments.belongsTo(Professionals, {
  foreignKey: "professionalId",
  as: "professional",
});

Appointments.belongsTo(Procedures, {
  foreignKey: "procedureId",
  as: "procedure",
});

Payment.belongsTo(Appointments, {
  foreignKey: "appointmentId",
  as: "appointment",
});
