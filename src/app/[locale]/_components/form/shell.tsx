import Container from "@/app/[locale]/_components/common/container";
import { type MessageKeys } from "global";
import { useTranslations } from "next-intl";

type Props = {
  title: MessageKeys<IntlMessages>;
  children: React.ReactNode;
};

export default function FormShell({ title, children }: Props) {
  const t = useTranslations();

  return (
    <Container>
      <div className="container relative flex flex-col items-center justify-center h-full px-5 sm:px-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[350px] max-w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              {t(title)}
            </h1>
          </div>
          {children}
        </div>
      </div>
    </Container>
  );
}
