
export const ForgotPassword = (data) => {
  
  const template = 
   ` 
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 5px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px;
            text-align: center;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${process.env.NEXT_BASE_API}/neu-blue.webp" alt="NeuOutlet Parts Logo">
        </div>
        <div class="content">
            <p>Hello ${data.name},</p>
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            <a href="${data.url}" style="color:white" class="button">Reset Password</a>
            <p>If you did not request this change, you can safely ignore this email. Your password will not be changed.</p>
            <p>Best regards,<br>The NeuOutlet Parts Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 NeuOutlet Parts. All rights reserved.</p>
            <p>123 N Loop Blvd E, Austin, TX 78751</p>
        </div>
    </div>
</body>
</html>
   `;
 
  return template;
}