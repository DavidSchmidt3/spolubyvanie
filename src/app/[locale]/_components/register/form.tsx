"use client";
import * as React from "react";

import { Divider } from "@/app/[locale]/_components/common/divider";
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
import { PasswordInput } from "@/app/[locale]/_components/ui/password";
import { useActionToast } from "@/hooks/action-toast";
import { useControlledForm } from "@/hooks/form";
import { useLocale } from "@/hooks/locale";
import { googleLogin as googleRegister } from "@/lib/data/actions/login";
import { USER_AUTH_FORM_SCHEMA } from "@/lib/data/actions/login/schema";
import { signUpWithEmail } from "@/lib/data/actions/register";
import { cn } from "@/lib/utils";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useMemo, useTransition } from "react";
import { type z } from "zod";

type UserAuthFormValues = z.infer<typeof USER_AUTH_FORM_SCHEMA>;
type UserRegisterProps = React.HTMLAttributes<HTMLDivElement>;

export default function UserRegisterForm({
  className,
  ...props
}: UserRegisterProps) {
  const t = useTranslations("translations");
  const router = useRouter();
  const { execute, isExecuting, result, hasErrored, hasSucceeded } =
    useAction(signUpWithEmail);
  const locale = useLocale();
  const {
    execute: executeGoogleRegister,
    isExecuting: isGoogleRegisterExecuting,
  } = useAction(googleRegister);
  const [isRoutingPending, startTransition] = useTransition();

  const onActionSuccess = () => {
    startTransition(() => {
      router.push("/login");
    });
  };

  useActionToast({
    hasErrored,
    hasSucceeded,
    result,
    errorTitle: "alerts.register.error.title",
    successTitle: "alerts.register.success.title",
    onSuccess: onActionSuccess,
  });

  const defaultValues = useMemo<UserAuthFormValues>(() => {
    return {
      email: "",
      password: "",
      locale,
    };
  }, [locale]);

  const form = useControlledForm<UserAuthFormValues>({
    schema: USER_AUTH_FORM_SCHEMA,
    defaultValues,
  });

  async function handleEmailSignUp(data: UserAuthFormValues) {
    execute(data);
  }

  async function handleGoogleSignUp() {
    executeGoogleRegister({ locale });
  }

  return (
    <div
      className={cn("grid gap-6", className)}
      {...props}
      data-pending={isRoutingPending}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEmailSignUp)}>
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
            <Button
              disabled={isExecuting}
              variant="ringHover"
              className="text-base"
              aria-label={t("register.button")}
            >
              {isExecuting && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("register.button")}
            </Button>
          </div>
        </form>
      </Form>
      <Divider text={t("auth.alternative_method.label")} />
      <form action={handleGoogleSignUp}>
        <Button
          disabled={isGoogleRegisterExecuting}
          variant="outline"
          type="submit"
          className="w-full text-base"
          aria-label={t("register.google.button")}
        >
          {isGoogleRegisterExecuting && (
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          )}
          <Icons.google className="w-4 h-4 mr-2" />
          {t("register.google.button")}
        </Button>
      </form>
      <Divider text={t("register.already_have_account.label")} />
      <Button
        onClick={() => router.push("/login")}
        aria-label={t("register.login.button")}
        className="w-full text-base"
        variant="outline"
      >
        {t("register.login.button")}
      </Button>
    </div>
  );
}
