"use server";

import { CONTACT_FORM_SCHEMA } from "@/lib/data/actions/email/schema";
import {
  ActionError,
  actionClient,
} from "@/lib/data/actions/safe-action-client";
import { transporter } from "@/lib/utils/email";
import { DEFAULT_LOCALE, type Locale } from "@/lib/utils/localization/i18n";
import { db } from "@/lib/utils/prisma";
import { formatZodErrors } from "@/lib/utils/zod";
import { getTranslations } from "next-intl/server";

export const contactAdvertisementOwner = actionClient
  .schema(CONTACT_FORM_SCHEMA, {
    handleValidationErrorsShape: formatZodErrors,
  })
  .action(
    async ({ parsedInput: { userId, advertisementTitle, message, email } }) => {
      const advertisementOwner = await db.users.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

      if (advertisementOwner.email === email) {
        throw new ActionError("alerts.advertisement.contact.self");
      }

      if (!advertisementOwner.email) {
        console.error(advertisementOwner);
        throw new ActionError("alerts.advertisement.contact.not_delivered");
      }

      const userSettings = await db.user_settings.findUnique({
        where: {
          id: advertisementOwner.id,
        },
      });

      const locale = (userSettings?.locale ?? DEFAULT_LOCALE) as Locale;
      const t = await getTranslations({
        locale,
        namespace: "translations.advertisement",
      });

      try {
        const response = await transporter.sendMail({
          from: `${t("contact.email_sender")} ${process.env.SMTP_EMAIL}`,
          sender: email,
          to: advertisementOwner.email,
          subject: `${t("contact.email_subject")} - ${advertisementTitle}`,
          text: message,
          replyTo: email,
        });

        if (response.rejected?.length) {
          console.error(response);
          throw new ActionError("alerts.advertisement.contact.not_delivered");
        }
      } catch (e) {
        if (e instanceof ActionError) {
          throw e;
        }
        throw new ActionError("alerts.advertisement.contact.not_delivered");
      }
    }
  );
