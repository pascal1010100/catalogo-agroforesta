import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Enviar correo al administrador
    const adminEmail = await resend.emails.send({
      from: 'Agroforesta <contacto@tudominio.com>', // Reemplaza con tu dominio verificado en Resend
      to: 'tu-email@ejemplo.com', // Reemplaza con el email del administrador
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
      from: 'Agroforesta <contacto@tudominio.com>', // Reemplaza con tu dominio verificado en Resend
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
