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
import { PasswordInput } from "@/app/[locale]/_components/ui/password";
import { useActionToast } from "@/hooks/action-toast";
import { useControlledForm } from "@/hooks/form";
import { changePassword } from "@/lib/data/actions/password-change";
import { PASSWORD_CHANGE_SCHEMA } from "@/lib/data/actions/password-change/schema";
import { cn } from "@/lib/utils";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import { type z } from "zod";

type ChangePasswordFormValues = z.infer<typeof PASSWORD_CHANGE_SCHEMA>;
type ResetPasswordProps = React.HTMLAttributes<HTMLDivElement>;

export default function PasswordChangeForm({
  className,
  ...props
}: ResetPasswordProps) {
  const t = useTranslations("translations");
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("code") ?? "";
  const { execute, isExecuting, result, hasErrored, hasSucceeded } =
    useAction(changePassword);
  const [isRoutingPending, startTransition] = useTransition();

  const onActionSuccess = () => {
    startTransition(() => {
      router.push("/login");
    });
  };

  const onActionError = () => {
    startTransition(() => {
      router.push("/password-reset");
    });
  };

  useActionToast({
    hasErrored,
    hasSucceeded,
    result,
    errorTitle: "alerts.password_change.error.title",
    successTitle: "alerts.password_change.success.title",
    onSuccess: onActionSuccess,
    onError: onActionError,
  });

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
    execute(data);
  }

  return (
    <div
      className={cn("grid gap-6", className)}
      {...props}
      data-pending={isRoutingPending}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("auth.password.label")}
                      autoComplete="new-password"
                      className="text-base"
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
                    <PasswordInput
                      placeholder={t("auth.password_confirm.label")}
                      autoComplete="new-password"
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
              aria-label={t("password_change.button")}
            >
              {isExecuting && (
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
