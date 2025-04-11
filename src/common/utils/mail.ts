import * as nodemailer from 'nodemailer';


export const sendMail = async (to: string, name: string, forRole: 'user' | 'admin') => {
    console.log("Sending mail to: ", to, name, forRole);
    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.in",  
        port: 587,
        secure: false, 
        auth: {
            user: process.env.ZOHO_USER,
            pass: process.env.ZOHO_PASS,
          }

        // configService.get<string>('MONGO_URL'),

    });

    let info = await transporter.sendMail({
        from: '"Sourav Codes" <info@souravcodes.in>',
        to,
        subject: "Booking Confirmation ✔", 
        text: "Your booking is confirmed. Somebody from the team will contact you soon.", // plain text body
        html: forRole === 'user' ? getUserTemplate(name) : getAdminTemplate()
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


const getUserTemplate = (name = 'User') => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .content {
            display: flex;
        }
        .card {
            border: 1px solid #198754;
            border-radius: 5px;
            background-color: rgb(233, 251, 243);
            text-align: center;
            padding: 1rem;
            color: #198754;
        }
    </style>
</head>
<body>
    <div class="content" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
        <div class="card">
            <div style="font-size: x-large;">Hi ${name}</div>
            <img style="margin-top: .5rem;" alt="" width="50" src="https://png2.cleanpng.com/sh/f0a2f5035da51a37ce7d5a1959f92d02/L0KzQYm3U8E2N51rfZH0aYP2gLBuTfNpbZRwRd9qcnuwc7F0kQV1baMygdV4boOwc73wkL1ieqUyfARuZX6whLrqi71uaaNwRadqYXK0c4a4UBRiOZI7RqMDOEO6RISCUcUzOWI7S6U9NUK4Qoa1kP5o/kisspng-check-mark-computer-icons-clip-art-green-tick-mark-5aab1c513da1a6.1883743915211633452525.png" />
            <div class="text-success mt-2">
                Your booking is confirmed. Somebody from the team contact you soon.
            </div>
        </div>
    </div>
</body>
</html>`

const getAdminTemplate = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .content {
            display: flex;
        }
        .card {
            border: 1px solid #0d6efd;
            border-radius: 5px;
            background-color: rgb(230, 240, 255);
            text-align: center;
            padding: 1rem;
            color: #0d6efd;
        }
    </style>
</head>
<body>
    <div class="content" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
        <div class="card">
            <div style="font-size: large;">Hey, you have a new booking !</div>
            <img style="margin-top: .5rem;" alt="" width="50" src="https://png2.cleanpng.com/sh/ad1611242c6b8b2a35a58dcae0db3eb9/L0KzQYm3U8MxN5xrj5H0aYP2gLBuTfxwb5CygdDvb4LwccXwjB4udJpnitN7eT3lhcTwjvV0e15uhth4cn3khLr2jr02aZNqTNM5MEG8QbfrUb45PGY9TKo7OEG4QoO7UsAzOmU2SKQELoDxd1==/kisspng-logo-information-library-business-information-5abe4a00191fd1.8458482815224202241029.png" />
            <div class="text-success mt-2">
                Please login to admin dashboard for more details.
            </div>
        </div>
    </div>
</body>
</html>`
