export const User = (fullName,email,password) => {

    const temp = `
        <!DOCTYPE html>
   <html>
   <head>
   </head>
   <body style="font-family: Arial, sans-serif; line-height: 1.6;">
       <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
           <h2>Your New Account Details for Neuparts Outlet</h2>
           <p>Dear ${fullName},</p>
           <p>Thank you for shopping with us at Neuparts Outlet. We have created a new account for you based on your recent purchase. Below are the details you will need to access your account:</p>
           <p><strong>Email:</strong> ${email}<br>
           <strong>Temporary Password:</strong> ${password}</p>
           <p>To ensure the security of your account, we recommend that you change your password upon logging in for the first time. You can access your account and manage your orders, view your order history, and update your personal information through the following link:</p>
           <p><a style="display: inline-block; background: #3498db; color: #ffffff; padding: 10px 20px; text-decoration: none; border: none; border-radius: 5px;" href="${process.env.NEXT_BASE_API}/login">Login to Your Account</a></p>
           <p>Thank you for choosing us for your shopping needs. We look forward to serving you again.</p>
       </div>
   </body>
   </html>   
    `
    return temp;
}