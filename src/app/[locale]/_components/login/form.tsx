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
import { useToast } from "@/app/[locale]/_components/ui/use-toast";
import { useControlledForm } from "@/hooks/form";
import { cn } from "@/lib/utils";
import { googleLogin, signInWithEmail } from "@/lib/utils/data/actions/login";
import { USER_AUTH_FORM_SCHEMA } from "@/lib/utils/data/actions/login/schema";
import { Link, useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useMemo } from "react";
import { type z } from "zod";

type UserAuthFormValues = z.infer<typeof USER_AUTH_FORM_SCHEMA>;
type UserLoginProps = React.HTMLAttributes<HTMLDivElement>;

export default function UserLoginForm({ className, ...props }: UserLoginProps) {
  "use no memo";
  const t = useTranslations("translations");
  const router = useRouter();
  const { toast } = useToast();
  const { execute, isExecuting, result, hasErrored } =
    useAction(signInWithEmail);

  const defaultValues = useMemo<UserAuthFormValues>(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const form = useControlledForm<UserAuthFormValues>({
    schema: USER_AUTH_FORM_SCHEMA,
    defaultValues,
  });

  useEffect(() => {
    if (hasErrored) {
      toast({
        title: "alerts.login.error.title",
        description: result.validationErrors ?? result.serverError,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, hasErrored]);

  async function onSubmit(data: UserAuthFormValues) {
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="/password-reset" className="text-sm text-primary">
              {t("login.forgot_password.link")}
            </Link>
            <Button disabled={isExecuting} variant="ringHover">
              {isExecuting && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("login.email.button")}
            </Button>
          </div>
        </form>
      </Form>
      <Divider text={t("auth.alternative_method.label")} />
      <form action={googleLogin}>
        <Button variant="outline" type="submit" className="w-full">
          <Icons.google className="w-4 h-4 mr-2" />
          {t("login.google.button")}
        </Button>
      </form>
      <Divider text={t("login.no_account.label")} />
      <Button
        onClick={() => router.push("/register")}
        className="w-full"
        variant="outline"
      >
        {t("login.register.button")}
      </Button>
    </div>
  );
}
