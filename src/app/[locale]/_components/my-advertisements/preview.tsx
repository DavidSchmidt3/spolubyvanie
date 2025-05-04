"use client";
import AdvertisementPreviewContent from "@/app/[locale]/_components/advertisement/preview-content";
import AdvertisementActions from "@/app/[locale]/_components/home/advertisement/actions";
import { useActionToast } from "@/hooks/action-toast";
import { deleteAdvertisement } from "@/lib/data/actions/my-advertisements";
import type { Advertisement as AdvertisementType } from "@/lib/data/advertisements/format";
import type { Locale } from "@/lib/utils/localization/i18n";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useAction } from "next-safe-action/hooks";

type Props = {
  advertisement: AdvertisementType;
  locale: Locale;
};

export default function AdvertisementPreview({ advertisement, locale }: Props) {
  const router = useRouter();
  const { execute, isExecuting, hasErrored, result, hasSucceeded } = useAction(
    deleteAdvertisement,
    {
      onSuccess: () => {
        router.refresh();
      },
    }
  );

  useActionToast({
    hasErrored,
    hasSucceeded,
    result,
    successTitle: "alerts.my_advertisements.delete.success.title",
    errorTitle: "alerts.my_advertisements.delete.error.title",
  });

  // Optimistic action simulation
  if (isExecuting || hasSucceeded) return null;

  return (
    <AdvertisementPreviewContent
      advertisement={advertisement}
      locale={locale}
      actions={
        <AdvertisementActions
          advertisement={advertisement}
          isExecuting={isExecuting}
          execute={execute}
        />
      }
    />
  );
}
