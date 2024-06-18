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
import { changePassword } from "@/lib/utils/data/actions/password-change";
import { PASSWORD_CHANGE_SCHEMA } from "@/lib/utils/data/actions/password-change/schema";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { type z } from "zod";

type ChangePasswordFormValues = z.infer<typeof PASSWORD_CHANGE_SCHEMA>;
type ResetPasswordProps = React.HTMLAttributes<HTMLDivElement>;

export default function PasswordChangeForm({
  className,
  ...props
}: ResetPasswordProps) {
  "use no memo";
  const t = useTranslations("translations");
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("code") ?? "";

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  const defaultValues = useMemo<ChangePasswordFormValues>(() => {
    return {
      password: "",
      passwordConfirm: "",
      accessToken,
    };
  }, [accessToken]);

  const form = useControlledForm<ChangePasswordFormValues>({
    schema: PASSWORD_CHANGE_SCHEMA,
    defaultValues,
  });

  async function onSubmit(data: ChangePasswordFormValues) {
    const response = await changePassword(data);

    if (response?.isError) {
      toast({
        title: "alerts.password_change.error.title",
        description: response.error,
        variant: "destructive",
      });
      router.push("/password-reset");
      return;
    }
    toast({
      title: "alerts.password_change.success.title",
      description: "alerts.password_change.success.description",
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("auth.password.label")}
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("auth.password_confirm.label")}
                      autoComplete="new-password"
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
              {t("password_change.button")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
