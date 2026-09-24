import { prisma } from "@/prisma/prisma-client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "./send-email";
import {
  DeleteTemplate,
  VerificationTemplate,
} from "@/components/email-templates";
import { nextCookies } from "better-auth/next-js";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        input: false,
        returned: false,

      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: "Verify Delete User",
          react: DeleteTemplate({ name: user.name, url }),
        });
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    async sendVerificationEmail({ url, user }) {
      await sendEmail({
        to: user.email,
        subject: "Next Ceramic Verification",
        react: VerificationTemplate({ name: user.name, url }),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
