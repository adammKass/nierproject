// import { Resend } from "resend";

// const resend = new Resend(import.meta.env.RESEND_API_KEY);

// export async function POST({ request }) {
//   const data = await request.formData();

//   const name = data.get("name");
//   const email = data.get("email");
//   const subject = data.get("subject");
//   const message = data.get("message");

//   const honeypot = data.get("company"); // spam trap

//   if (honeypot) {
//     return new Response("Spam detected", { status: 400 });
//   }

//   try {
//     await resend.emails.send({
//       from: "Portfolio <onboarding@resend.dev>",
//       to: "your@email.com",
//       subject: `Portfolio Contact: ${subject}`,
//       reply_to: email,
//       html: `
//         <h2>New message from portfolio</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `,
//     });

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ success: false }), {
//       status: 500,
//     });
//   }
// }
