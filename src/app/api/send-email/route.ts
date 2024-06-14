import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, message, phone } = body
    if (!email || !name || !message) {
      return new NextResponse("Missing info", { status: 400 })
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    })

    await transporter.sendMail({
      from: `Blog App ${process.env.EMAIL}`,
      to: process.env.EMAIL,
      subject: `Message from ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>`,
    })
    return NextResponse.json({ message: "Email was sent" })
  } catch (error: any) {
    console.error(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
