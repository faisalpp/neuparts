export const Contact = (data) => {
  
    const template = 
     ` 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neuparts Contact Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
    <table style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #dddddd; padding: 20px; border-radius: 8px; width: 100%;" cellspacing="0" cellpadding="0">
        <tr>
            <td style="text-align: center; font-size: 1.5em; font-weight: bold; color: #333; padding-bottom: 20px;">
                New Contact Message
            </td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">
                <strong>Customer Name:</strong>
                <p style="margin: 5px 0;">${data.name}</p>
            </td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">
                <strong>Customer Email:</strong>
                <p style="margin: 5px 0;">${data.email}</p>
            </td>
        </tr>
        <tr>
            <td style="padding-bottom: 10px;">
                <strong>Message:</strong>
                <p style="margin: 5px 0;">${data.message}</p>
            </td>
        </tr>
        <tr>
            <td style="font-size: 0.9em; color: #888; text-align: center; padding-top: 20px;">
                This is an automated email. Please do not reply directly.
            </td>
        </tr>
    </table>
</body>
</html>

     `;
   
    return template;
  }