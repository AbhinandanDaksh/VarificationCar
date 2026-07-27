exports.verifyEmailTemplate = ({ name, token }) => ({
  subject: 'Verify your VarificationCar email',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>Hello, ${name}</h2>
      <p>Please verify your email using this token:</p>
      <p style="font-size: 20px; font-weight: bold; letter-spacing: 1px; word-break: break-all;">${token}</p>
      <p>This token is valid for 24 hours.</p>
      <p>— Team VarificationCar</p>
    </div>
  `,
  text: `Hello ${name}, verify your email with token: ${token}. Valid for 24 hours.`,
});
