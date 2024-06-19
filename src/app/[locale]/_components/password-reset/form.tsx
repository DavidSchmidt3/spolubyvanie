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
import { useParams } from "next/navigation";
import { useMemo } from "react";
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

  async function onSubmit(data: ResetPasswordFormValues) {
    const response = await resetPassword(data);

    if (response?.isError) {
      toast({
        title: "alerts.password_reset.error.title",
        description: response.error,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "alerts.password_reset.success.title",
      description: "alerts.password_reset.success.description",
      variant: "success",
    });
    router.push("/login");
  }

  const isPending = form.formState.isSubmitting;

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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} variant="ringHover" type="submit">
              {isPending && (
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
