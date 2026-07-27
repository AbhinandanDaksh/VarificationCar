exports.paymentEmail = ({ name, amount, status, orderId }) => ({
  subject: `Payment ${status} — Order ${orderId}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>Payment Update</h2>
      <p>Hi ${name},</p>
      <p>Amount: <strong>₹${amount}</strong></p>
      <p>Status: <strong>${status}</strong></p>
      <p>Order ID: ${orderId}</p>
      <p>— Team VarificationCar</p>
    </div>
  `,
  text: `Hi ${name}, payment of ₹${amount} is ${status}. Order ID: ${orderId}`,
});
