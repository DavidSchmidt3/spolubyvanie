"use client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/[locale]/_components/ui/alert";
import { ApiError } from "@/lib/utils/supabase/error";
import { useTranslations } from "next-intl";

interface Props {
  error: Error;
}

const NS = "validation";

export default function ErrorAlert({ error }: Props) {
  const t = useTranslations();

  let errorCode = "unexpected_error";
  if (error instanceof ApiError) {
    errorCode = `${error.name}.${error.code}`;
  }

  return (
    <Alert variant="destructive">
      <AlertTitle>{t("common.error.label")}</AlertTitle>
      <AlertDescription>{t(errorCode, { ns: NS })}</AlertDescription>
    </Alert>
  );
}
