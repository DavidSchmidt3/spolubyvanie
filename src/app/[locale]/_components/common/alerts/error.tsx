"use client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/[locale]/_components/ui/alert";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  error: Error;
  className?: string;
}

// no destructuring because otherwise next ts plugin complains that error is not serializable in client component
// fix would be to not mark as client component, however that triggers next.js error that error components must be client components
export const ErrorAlert = (props: Props) => {
  const t = useTranslations();
  // TODO: fix translations

  return (
    <Alert variant="destructive" className={cn("mt-2", props.className)}>
      <AlertTitle>{t("common.error.label")}</AlertTitle>
      {!(props.error instanceof Error) ? (
        <AlertDescription>
          {/* TODO: fix error type */}
          {/* {t(`errors.${props.error.data?.code}`)} */}
        </AlertDescription>
      ) : null}
    </Alert>
  );
};
