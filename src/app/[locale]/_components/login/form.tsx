"use client";
import * as React from "react";

import { Divider } from "@/app/[locale]/_components/common/divider";
import TransitionLink from "@/app/[locale]/_components/navigation/transition-link";
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
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { useControlledForm } from "@/hooks/form";
import { useLocale } from "@/hooks/locale";
import { googleLogin, signInWithEmail } from "@/lib/data/actions/login";
import { USER_AUTH_FORM_SCHEMA } from "@/lib/data/actions/login/schema";
import { cn } from "@/lib/utils";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";

import { useAction } from "next-safe-action/hooks";
import { useEffect, useMemo, useTransition } from "react";
import { type z } from "zod";

type UserAuthFormValues = z.infer<typeof USER_AUTH_FORM_SCHEMA>;
type UserLoginProps = React.HTMLAttributes<HTMLDivElement>;

export default function UserLoginForm({ className, ...props }: UserLoginProps) {
  const t = useTranslations("translations");
  const router = useRouter();
  const { toast } = useToast();
  const {
    execute: executeSignInWithEmail,
    isExecuting: isSignInWithEmailExecuting,
    result,
    hasErrored,
  } = useAction(signInWithEmail);
  const locale = useLocale();
  const [isRoutingPending, startTransition] = useTransition();

  const { execute: executeGoogle, isExecuting: isGoogleLoginExecuting } =
    useAction(googleLogin);

  const defaultValues = useMemo<UserAuthFormValues>(() => {
    return {
      locale,
      email: "",
      password: "",
    };
  }, [locale]);

  const form = useControlledForm<UserAuthFormValues>({
    schema: USER_AUTH_FORM_SCHEMA,
    defaultValues,
  });

  useEffect(() => {
    if (hasErrored) {
      toast({
        title: "alerts.login.error.title",
        description: result.validationErrors ?? result.serverError,
        variant: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, hasErrored]);

  async function handleEmailLogin(data: UserAuthFormValues) {
    executeSignInWithEmail(data);
  }

  async function handleGoogleLogin() {
    executeGoogle({ locale });
  }

  return (
    <div
      className={cn("grid gap-6", className)}
      {...props}
      data-pending={isRoutingPending}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEmailLogin)}>
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
                      autoComplete="current-password"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TransitionLink
              href="/password-reset"
              className="text-sm text-primary"
            >
              {t("login.forgot_password.link")}
            </TransitionLink>
            <Button
              disabled={isSignInWithEmailExecuting}
              variant="ringHover"
              className="text-base"
              aria-label={t("login.email.button")}
            >
              {isSignInWithEmailExecuting && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("login.email.button")}
            </Button>
          </div>
        </form>
      </Form>
      <Divider text={t("auth.alternative_method.label")} />
      <form action={handleGoogleLogin}>
        <Button
          disabled={isGoogleLoginExecuting}
          variant="outline"
          type="submit"
          className="w-full text-base group"
          aria-label={t("login.google.button")}
        >
          {isGoogleLoginExecuting && (
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          )}
          <Icons.google className="w-4 h-4 mr-2 group-hover:motion-preset-seesaw" />
          {t("login.google.button")}
        </Button>
      </form>
      <Divider text={t("login.no_account.label")} />
      <Button
        onClick={() => startTransition(() => router.push("/register"))}
        className="w-full text-base"
        variant="outline"
        aria-label={t("login.register.button")}
      >
        {t("login.register.button")}
      </Button>
    </div>
  );
}
