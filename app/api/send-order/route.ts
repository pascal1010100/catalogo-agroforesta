import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Usa el API key de tu archivo .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { usuario, productos, total } = data;

    // Construye el cuerpo del correo en HTML
    const html = `
      <h2>Nuevo pedido desde Agroforesta</h2>
      <h3>Datos del usuario</h3>
      <ul>
        <li><b>Nombre:</b> ${usuario.nombre}</li>
        <li><b>Email:</b> ${usuario.email}</li>
        <li><b>Teléfono:</b> ${usuario.telefono}</li>
        <li><b>Dirección:</b> ${usuario.direccion}</li>
      </ul>
      <h3>Productos</h3>
      <ul>
        ${productos
          .map(
            (p: any) =>
              `<li>${p.name} (x${p.quantity}) - Q${p.price.toFixed(2)}</li>`
          )
          .join("")}
      </ul>
      <p><b>Total:</b> Q${total.toFixed(2)}</p>
    `;

    // ENVÍA EL CORREO
    const { data: emailData, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Usa este remitente para pruebas
      to: "josemanu0885@gmail.com",  // Cambia aquí el correo destinatario
      subject: "Nuevo pedido desde Agroforesta",
      html,
    });

    if (error) {
      // Registra el error en consola para diagnóstico
      console.error("Error al enviar correo:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, emailData });
  } catch (error: any) {
    // Registra el error en consola para diagnóstico
    console.error("Error general en send-order:", error);
    return NextResponse.json({ ok: false, error: error.message || "Error desconocido" }, { status: 500 });
  }
}
