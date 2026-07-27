exports.resetPasswordTemplate = ({ name, token }) => ({
  subject: 'Reset your VarificationCar password',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>Hello, ${name}</h2>
      <p>Use this token to reset your password:</p>
      <p style="font-size: 20px; font-weight: bold; letter-spacing: 1px; word-break: break-all;">${token}</p>
      <p>This token is valid for 15 minutes. If you did not request this, ignore this email.</p>
      <p>— Team VarificationCar</p>
    </div>
  `,
  text: `Hello ${name}, reset password token: ${token}. Valid for 15 minutes.`,
});
