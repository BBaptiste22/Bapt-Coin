import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'smtp.gmail.com',
            port: Number(process.env.MAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendWelcomeMail(to: string): Promise<void> {
        await this.transporter.sendMail({
            from: `"BAPT-COIN" <${process.env.MAIL_USER}>`,
            to,
            subject: 'Bienvenue sur BAPT-COIN 🎉',
            html: `
                <h1>Bienvenue !</h1>
                <p>Ton compte a bien été créé avec l'adresse <strong>${to}</strong>.</p>
                <p>Content de t'avoir parmi nous 🙌</p>
            `,
        });
    }
}