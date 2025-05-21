const nodemailer = require('nodemailer');

class Notificacion {
    static async enviarCorreo(destinatario, mensaje) {
        // Crea una cuenta de prueba en Ethereal
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        let info = await transporter.sendMail({
            from: '"Sistema de Alarma" <no-reply@invernadero.com>',
            to: destinatario,
            subject: '⚠️ Alarma Activada',
            text: mensaje
        });

        console.log(`Correo simulado enviado a ${destinatario}: ${info.messageId}`);
        console.log(`Vista previa: ${nodemailer.getTestMessageUrl(info)}`);
    }
}

module.exports = Notificacion;