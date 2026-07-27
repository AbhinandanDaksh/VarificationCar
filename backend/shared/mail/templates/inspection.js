exports.inspectionEmail = ({ name, vehicleNumber, status, date }) => ({
  subject: `Inspection ${status} — ${vehicleNumber}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>Inspection Update</h2>
      <p>Hi ${name},</p>
      <p>Vehicle <strong>${vehicleNumber}</strong> inspection status: <strong>${status}</strong>.</p>
      <p>Date: ${date}</p>
      <p>— Team VarificationCar</p>
    </div>
  `,
  text: `Hi ${name}, vehicle ${vehicleNumber} inspection status: ${status}. Date: ${date}`,
});
