import { createAdvertisementFilterObject } from "@/lib/data/advertisements";
import { type AdvertisementFilterFormValues } from "@/lib/data/advertisements/schema";
import { type UserFilter } from "@/lib/data/user";
import { transporter } from "@/lib/utils/email";
import { DEFAULT_LOCALE } from "@/lib/utils/localization/i18n";
import { createObjectFromQueryString } from "@/lib/utils/localization/navigation";
import { db } from "@/lib/utils/prisma";
import { subDays } from "date-fns";
import { getTranslations } from "next-intl/server";
import { type NextRequest } from "next/server";

const BATCH_SIZE = 10;
const DELAY_BETWEEN_BATCHES = 1000;

export async function handler(req: NextRequest) {
  // TODO: ADD auth

  // 1. Fetch all user filters which have notify_with_email set to true
  const userFilters = await db.users_filters.findMany({
    where: { notify_with_email: true },
    include: { users: true },
  });

  // 2. For each user filter, fetch all advertisements that match the filter
  const advertisementsWithUserFilter = await Promise.all(
    userFilters.map(async (userFilter: UserFilter) => {
      const filterObject: AdvertisementFilterFormValues =
        createObjectFromQueryString(userFilter.query);

      const { where, orderBy } = createAdvertisementFilterObject(filterObject);

      const advertisements = await db.advertisements.findMany({
        where: {
          ...where,
          created_at: {
            gte: subDays(new Date(), 1),
          },
        },
        orderBy,
        include: {
          municipalities: {
            include: {
              districts: {
                include: {
                  regions: true,
                },
              },
            },
          },
          advertisements_photos: {
            select: {
              url: true,
            },
          },
          advertisements_properties: {
            select: {
              property_id: true,
            },
          },
        },
      });
      return {
        advertisements,
        userFilter,
      };
    })
  );

  // 3. Send emails in batches
  for (let i = 0; i < advertisementsWithUserFilter.length; i += BATCH_SIZE) {
    const batch = advertisementsWithUserFilter.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async ({ advertisements, userFilter }) => {
        if (!advertisements.length) return;
        try {
          const user = await db.users.findUnique({
            where: {
              id: userFilter.user_id,
            },
            include: {
              user_settings: true,
            },
          });

          if (!user || !user.email) return;
          const locale = user.user_settings?.locale ?? DEFAULT_LOCALE;

          // TODO: add translations to the project
          const t = await getTranslations({
            locale,
            namespace: "translations.email",
          });

          const subject = t("new_ads_subject", {
            filter: userFilter.name ?? "",
          });

          // TODO: create email template
          const body = [
            t("intro"),
            t("list_intro"),
            ...advertisements.map((ad) => `- ${ad.title}`),
          ].join("\n");

          await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: user.email,
            subject,
            text: body,
          });
        } catch (e) {
          console.error(
            "Error sending notification email for",
            userFilter?.user_id
          );
        }
      })
    );

    if (i + BATCH_SIZE < advertisementsWithUserFilter.length) {
      await new Promise((res) => setTimeout(res, DELAY_BETWEEN_BATCHES));
    }
  }
}
