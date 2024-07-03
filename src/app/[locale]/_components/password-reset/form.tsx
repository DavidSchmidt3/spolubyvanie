"use client";
import * as React from "react";

import { Button } from "@/app/[locale]/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/[locale]/_components/ui/form";
import { Icons } from "@/app/[locale]/_components/ui/icons";
import { Input } from "@/app/[locale]/_components/ui/input";
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { useControlledForm } from "@/hooks/form";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/lib/utils/data/actions/password-reset";
import { PASSWORD_RESET_SCHEMA } from "@/lib/utils/data/actions/password-reset/schema";
import { DEFAULT_LOCALE, type Locale } from "@/lib/utils/localization/i18n";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { type z } from "zod";

type ResetPasswordFormValues = z.infer<typeof PASSWORD_RESET_SCHEMA>;
type ResetPasswordProps = React.HTMLAttributes<HTMLDivElement>;

export default function PasswordResetForm({
  className,
  ...props
}: ResetPasswordProps) {
  "use no memo";
  const t = useTranslations("translations");
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { execute, isExecuting, result, hasErrored, hasSucceeded } =
    useAction(resetPassword);

  const defaultValues = useMemo<ResetPasswordFormValues>(() => {
    return {
      email: "",
      locale: (params.locale as Locale) ?? DEFAULT_LOCALE,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useControlledForm<ResetPasswordFormValues>({
    schema: PASSWORD_RESET_SCHEMA,
    defaultValues,
  });

  useEffect(() => {
    if (hasErrored) {
      toast({
        title: "alerts.password_reset.error.title",
        description: result.validationErrors ?? result.serverError,
        variant: "destructive",
      });
    }

    if (hasSucceeded) {
      toast({
        title: "alerts.password_reset.success.title",
        description: "alerts.password_reset.success.description",
        variant: "success",
      });
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, hasErrored, hasSucceeded]);

  async function onSubmit(data: ResetPasswordFormValues) {
    execute(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("auth.email.label")}
                      autoComplete="email"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isExecuting}
              variant="ringHover"
              type="submit"
              className="text-base"
              aria-label={t("password_reset.button")}
            >
              {isExecuting && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("password_reset.button")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
