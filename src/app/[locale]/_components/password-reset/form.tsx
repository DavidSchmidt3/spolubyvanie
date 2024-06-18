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
import { toast } from "@/app/[locale]/_components/ui/use-toast";
import { useControlledForm } from "@/hooks/form";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/lib/utils/data/actions/reset-password";
import { RESET_PASSWORD_SCHEMA } from "@/lib/utils/data/actions/reset-password/schema";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { type z } from "zod";

type ResetPasswordFormValues = z.infer<typeof RESET_PASSWORD_SCHEMA>;
type ResetPasswordProps = React.HTMLAttributes<HTMLDivElement>;

export default function PasswordResetForm({
  className,
  ...props
}: ResetPasswordProps) {
  "use no memo";
  const t = useTranslations("translations");

  const defaultValues = useMemo<ResetPasswordFormValues>(() => {
    return {
      email: "",
    };
  }, []);

  const form = useControlledForm<ResetPasswordFormValues>({
    schema: RESET_PASSWORD_SCHEMA,
    defaultValues,
  });

  async function onSubmit(data: ResetPasswordFormValues) {
    const response = await resetPassword(data);

    if (response?.isError) {
      toast({
        title: "alerts.reset_password.error.title",
        description: response.error,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "alerts.reset_password.success.title",
      description: "alerts.reset_password.success.description",
      variant: "success",
    });
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
