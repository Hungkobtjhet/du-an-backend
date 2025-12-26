import nodemailer from 'nodemailer';

export class MailService {
    private static transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    static async sendOrderEmail(to: string, orderData: any) {
        const html = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, ${orderData.customerName}!</p>
      <p>Order No: <strong>${orderData.orderNo}</strong></p>
      <p>Total: ${orderData.totalPrice}</p>
      <hr/>
      <p>We will deliver to: ${orderData.address}</p>
    `;

        try {
            await this.transporter.sendMail({
                from: `"${process.env.APP_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
                to,
                subject: `Order Confirmation - ${orderData.orderNo}`,
                html,
            });
        } catch (error) {
            console.error('Mail Error:', error);
        }
    }
}
