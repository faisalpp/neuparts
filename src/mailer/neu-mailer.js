import NodeMailer from 'nodemailer'

export const NeuMailer = async (To,Subject,Body) => {
    
  const SMTP_HOST = process.env.NEXT_SMTP_HOST
  const SMTP_PASS = process.env.NEXT_SMTP_PASS

  //1. create mail transporter
  const Transporter =  NodeMailer.createTransport({
   service: 'gmail',
   auth:{
    user: SMTP_HOST,
    pass: SMTP_PASS
   }
  })

  //2. configure email content.
  const mailOptions = {
   from: SMTP_HOST,
   to: To,
   subject: Subject,
   html: Body
  }

  //3. send email
  try {
    await Transporter.sendMail(mailOptions);
  } catch (error) {
    return false
  }

}