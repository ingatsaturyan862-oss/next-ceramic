/* eslint-disable @typescript-eslint/no-explicit-any */

import { Resend } from "resend";

interface Props {
  to: string;
  subject: string;
  react: any;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, react }: Props) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Next Ceramic <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}
