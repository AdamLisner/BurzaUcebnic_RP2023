import { SMTPClient } from "emailjs";

/**
 * Send an email to a user who expressed interest in a product
 * @async
 * @function
 * @param {*} req - The request object received by the API endpoint.
 *                       Contains information that will be sent to the user.
 * @param {*} res - The response object that will be sent to the user.
 
 */
export default async function handler(req, res) {
  // creating a destructurated object to hold the email data
  const {
    email,
    name,
    productName,
    productImage,
    buyerEmail,
    buyerName,
    price,
  } = req.body;
  // setting the email client
  const client = new SMTPClient({
    user: process.env.NODEMAILER_EMAIL,
    password: process.env.NODEMAILER_PASSWORD,
    host: "smtp.gmail.com",
    ssl: true,
  });
  try {
    await client.sendAsync({
      text: `${buyerName} má zájem o vaši knihu ${productName}`,

      from: process.env.NODEMAILER_EMAIL,

      to: email,

      subject: `Uživatel ${name} má zájem o vaši knihu!`,
      attachment: [
        {
          data: `<html>
          <body style="background-color: #FFFFFF;
             color: #000000;
             font-family: Arial, sans-serif;
             font-size: 16px;
             line-height: 1.5;
             margin: 0;
             padding: 0;">
             <div class="container" style="background-color: #F5F5F5;
                margin: 0 auto;
                max-width: 600px;
                text-align: left;
                padding: 20px;">
                <div class="header" style=" border-bottom: 1px solid #CCCCCC;
                   margin-bottom: 20px;
                   padding-bottom: 20px;">
                   <h2 style=" color: #0077FF;
                      font-size: 24px;
                      margin: 0;">
                      ${buyerName} má zájem o ${productName}
                   </h2>
                </div>
                <div class="content" style="margin-bottom: 20px;
                   display: flex;
                   flex-direction: column; !important">
                   <div>
                      <img src=${productImage} style=" display: block;
                         max-width: 100%;">
                   </div>
                   <p class="heading3" style="font-family: " Helvetica Neue", color: #000000; font-size: 20px; margin: 2em 0; margin-bottom: 10px  font-weight: bold;">
                   Kontaktuj jej a domluvte si předání a platební metodu.
                   </p>
                   <div style="display:flex; justify-content:space-between; ; gap:0.5rem;">
                      <div>
                         <h2 style="color: #333333;
                            font-size: 18px;
                            margin: 0;
                            margin-bottom: 10px;">Kontakt:</h2>
                         <ul>
                            <li>Jméno: ${buyerName}</li>
                            <li>Email: <a href=mailto:${buyerEmail}>${buyerEmail}</a></li>
                            <li>Cena: ${price},- Kč</li>
                         </ul>
                      </div>
                      <div style="align-self:center;">
                         <a style=" text-align: center;
                            background-color: #0077FF;
                            border: none;
                            border-radius: 5px;
                            color: #FFFFFF;
                            cursor: pointer;
                            font-size: 18px;
                            padding:  0.5rem;
                            " id="klikmail" href=mailto:${buyerEmail}?subject=Prodej\u0020${productName}>Klikni zde a napiš mu!</a>
                      </div>
                   </div>
                </div>
             </div>
          </body>
       </html>`,
          alternative: true,
        },
      ],
    });
  } catch (e) {
    console.log(e);
    res.status(400).end(JSON.stringify({ message: "Error" }));
    return;
  }

  res.status(200).end(JSON.stringify({ message: "Send Mail" }));
}
