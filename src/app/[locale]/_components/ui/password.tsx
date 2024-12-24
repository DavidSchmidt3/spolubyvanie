"use client";

import { Button } from "@/app/[locale]/_components/ui/button";
import { Input, type InputProps } from "@/app/[locale]/_components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const t = useTranslations("translations");
    const [showPassword, setShowPassword] = useState(false);
    const disabled =
      props.value === "" || props.value === undefined || props.disabled;

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          aria-label={
            showPassword ? t("auth.password.hide") : t("auth.password.show")
          }
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon
              className="h-4 w-4 hover:motion-preset-seesaw"
              aria-hidden="true"
            />
          ) : (
            <EyeOffIcon
              className="h-4 w-4 hover:motion-preset-seesaw"
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {showPassword ? t("auth.password.hide") : t("auth.password.show")}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
