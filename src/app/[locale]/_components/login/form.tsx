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
import { useControlledForm } from "@/hooks/form";
import { cn } from "@/lib/utils";
import { googleLogin, signInWithEmail } from "@/lib/utils/data/actions/login";
import { USER_AUTH_FORM_SCHEMA } from "@/lib/utils/data/actions/login/schema";
import { useRouter } from "@/lib/utils/localization/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { type z } from "zod";
import { toast } from "../ui/use-toast";

type UserAuthFormValues = z.infer<typeof USER_AUTH_FORM_SCHEMA>;
type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  "use no memo";
  const t = useTranslations("translations");
  const router = useRouter();

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

  async function onSubmit(data: UserAuthFormValues) {
    const response = await signInWithEmail(data);

    if (response?.isError) {
      toast({
        title: "alerts.login.error.title",
        description: response.error,
        variant: "destructive",
      });
    }
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
                      placeholder={t("login.email.label")}
                      // autoComplete="email"
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
                    <Input
                      type="password"
                      placeholder={t("login.password.label")}
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} variant="ringHover">
              {isPending && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("login.email.button")}
            </Button>
          </div>
        </form>
      </Form>
      <Divider text={t("login.alternative_method.label")} />
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

function Divider({ text }: { text: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="px-2 bg-background text-muted-foreground">{text}</span>
      </div>
    </div>
  );
}
