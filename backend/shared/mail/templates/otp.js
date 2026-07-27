exports.otpEmail = ({ name, otp }) => ({
  subject: 'Your VarificationCar OTP',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>Hello, ${name}</h2>
      <p>Your OTP is:</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
      <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
      <p>— Team VarificationCar</p>
    </div>
  `,
  text: `Hello ${name}, your OTP is ${otp}. Valid for 10 minutes.`,
});
