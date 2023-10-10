const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../Schema/schema')


const router = express.Router();

router.post('/sendEmail', (req, res) => {
    try {
        const { email, message } = req.body;

        console.log({ email: email })

        const contact = new Contact({ email: email, message: message });

        contact.save().then(data => {
            res.send({ message: data })
        }).catch(error => console.log(error))

        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: process.env.user,
                // user: email,
                pass: process.env.pass
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.user,
            subject: ` Potfolio Job Interview from ---${email} `,
            text: message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return false;
            } else {
                console.log('Email sent:', info.response);
                return true;
            }
        });

        res.status(200).send({ email: email, message: message });
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;