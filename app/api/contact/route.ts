import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

// Esquema de validación
const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional().or(z.literal('')),
  subject: z.string().min(1, "El asunto es requerido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación con Zod
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = result.data;

    // Enviar correo al administrador
    const adminEmail = await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL || 'josemanu0885@gmail.com',
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c7a7b;">Nuevo mensaje de contacto</h2>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-line; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
          <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
            Este mensaje fue enviado desde el formulario de contacto de Agroforesta.
          </p>
        </div>
      `,
    });

    // Enviar correo de confirmación al usuario
    const confirmationEmail = await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Hemos recibido tu mensaje',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c7a7b;">¡Gracias por contactarnos, ${name}!</h2>
          <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
          
          <div style="margin: 30px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #2c7a7b;">
            <p style="margin: 0;"><strong>Asunto:</strong> ${subject}</p>
            <p style="margin: 10px 0 0 0;"><strong>Tu mensaje:</strong></p>
            <p style="white-space: pre-line; margin: 5px 0 0 0; padding: 10px; background-color: white; border-radius: 4px;">${message}</p>
          </div>
          
          <p>Si necesitas asistencia inmediata, no dudes en llamarnos al +52 123 456 7890.</p>
          
          <p>Atentamente,<br>El equipo de Agroforesta</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.8em; color: #666;">
            <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
            <p>© ${new Date().getFullYear()} Agroforesta. Todos los derechos reservados.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente',
      data: {
        adminEmailId: adminEmail.data?.id || 'sent',
        confirmationEmailId: confirmationEmail.data?.id || 'sent'
      }
    });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
