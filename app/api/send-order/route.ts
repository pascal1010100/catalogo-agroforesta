import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Usa el API key de tu archivo .env.local
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

const orderSchema = z.object({
  usuario: z.object({
    nombre: z.string().min(2, "Nombre requerido"),
    email: z.string().email("Email inválido"),
    telefono: z.string().min(8, "Teléfono inválido"),
    direccion: z.string().min(5, "Dirección requerida"),
  }),
  productos: z.array(z.object({
    name: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0),
  })).min(1, "El pedido debe tener al menos un producto"),
  total: z.number().min(0),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validación Zod
    const result = orderSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: 'Datos de pedido inválidos', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { usuario, productos, total } = result.data;

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
          (p) =>
            `<li>${p.name} (x${p.quantity}) - Q${p.price.toFixed(2)}</li>`
        )
        .join("")}
      </ul>
      <p><b>Total:</b> Q${total.toFixed(2)}</p>
    `;

    // ENVÍA EL CORREO
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL || "josemanu0885@gmail.com",
      subject: "Nuevo pedido desde Agroforesta",
      html,
    });

    if (error) {
      // Registra el error en consola para diagnóstico
      console.error("Error al enviar correo:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, emailData });
  } catch (error: unknown) {
    // Registra el error en consola para diagnóstico
    console.error("Error general en send-order:", error);
    let errorMessage = "Error desconocido";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error as string;
    }
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}

//10 octubre 2025