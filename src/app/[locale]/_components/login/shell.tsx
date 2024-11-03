import Container from "@/app/[locale]/_components/common/container";
import { use } from "react";

type Props = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promiseT: Promise<any>;
};

export default function LoginShell({ children, promiseT }: Props) {
  const t = use(promiseT);

  return (
    <Container>
      <div className="container relative flex flex-col items-center justify-center h-full px-5 sm:px-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[350px] max-w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              {t("login.label")}
            </h1>
          </div>
          {children}
        </div>
      </div>
    </Container>
  );
}
