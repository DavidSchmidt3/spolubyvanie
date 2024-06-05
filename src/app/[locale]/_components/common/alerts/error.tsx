"use client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/[locale]/_components/ui/alert";
import { cn } from "@/lib/utils";
import { ApiError } from "@/lib/utils/supabase/error";
import { useTranslations } from "next-intl";

interface Props {
  error: Error;
  className?: string;
}

const NS = "validation";

export default function ErrorAlert({ error, className }: Props) {
  const t = useTranslations();

  let errorCode = "unexpected_error";
  if (error instanceof ApiError) {
    errorCode = `${error.name}.${error.code}`;
  }

  return (
    <Alert variant="destructive" className={cn("mt-2", className)}>
      <AlertTitle>{t("common.error.label")}</AlertTitle>
      <AlertDescription>{t(errorCode, { ns: NS })}</AlertDescription>
    </Alert>
  );
}
