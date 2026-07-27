exports.welcomeEmail = ({ name }) => ({
  subject: 'Welcome to VarificationCar',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>Welcome, ${name}!</h2>
      <p>Your account has been created successfully.</p>
      <p>You can now add vehicles and book inspections.</p>
      <p>— Team VarificationCar</p>
    </div>
  `,
  text: `Welcome, ${name}! Your account has been created successfully.`,
});
