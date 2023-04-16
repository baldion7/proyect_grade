import jwt from'jsonwebtoken';
import nodemailer from 'nodemailer';
import {User} from "../models/UserModel.js";
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
        user: 'baldionkevin8@gmail.com',
        pass: 'csuorppolblotipr'
    }
});
export const EmailForgotPassword=async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    console.log(user)
    if (!user) {
        return res.render('forgot-password');
    }


    const token = jwt.sign({email}, 'secret', {expiresIn: '1h'});
    const url = `http://localhost:5000/reset-password/${token}`;


    const mailOptions = {
        from: 'kquinones@uts.edu.co',
        to: email,
        subject: 'Restablecimiento de contraseña',
        text: `Haga clic en este enlace para restablecer su contraseña: ${url}`,
        html: `<p>Haga clic en <a href="${url}">este enlace</a> para restablecer su contraseña.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.render('pages/forgot-password');
}
export const EmailRegister=async (email,password) => {
    const mailOptions = {
        from: 'baldionkevin8@gmail.com',
        to: email,
        subject: 'Registro exitoso en la plataforma de CMMS ',

        html: `<!DOCTYPE html>
<html>
<head>
	<title>Registro exitoso en [Nombre de la plataforma]</title>
	<style type="text/css">
		.container {
			max-width: 600px;
			margin: auto;
			font-family: Arial, sans-serif;
			line-height: 1.5;
			color: #333333;
			padding: 20px;
			border: 1px solid #dddddd;
		}

		h1 {
			font-size: 28px;
			font-weight: bold;
			margin-top: 0;
		}

		p {
			font-size: 16px;
			margin-bottom: 20px;
		}

		.button {
			display: inline-block;
			padding: 10px 20px;
			font-size: 16px;
			font-weight: bold;
			background-color: #2e6da4;
			color: #ffffff;
			text-decoration: none;
			border-radius: 4px;
		}

		.button:hover {
			background-color: #245682;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>¡Bienvenido/a a [Nombre de la plataforma]!</h1>
		<p>Su registro en [Nombre de la plataforma] ha sido exitoso. Ahora puede disfrutar de todos los servicios y beneficios que ofrecemos.</p>
		<p>Le recordamos que su información de inicio de sesión es:</p>
		<ul>
			<li>Correo electrónico ${email}</li>
			<li>Contraseña: ${password}</li>
		</ul>
		<p>No olvide cambiar su contraseña y mantener su cuenta segura. Para comenzar a usar [Nombre de la plataforma], haga clic en el botón de abajo:</p>
		<a href="http://localhost:5000/" class="button">Iniciar sesión</a>
	</div>
</body>
</html>
</p>`
    };

    await transporter.sendMail(mailOptions);

    res.render('pages/forgot-password');
}



