import { useTranslations } from "next-intl";

type Props = {
  label: string;
  value?: number | string | null;
};

export default function InfoRow({ label, value }: Props) {
  const t = useTranslations("translations.advertisement");

  return (
    <div>
      <p className="text-base md:text-lg font-bold">{label}</p>
      <span className="text-base md:text-lg text-right break-words">
        {value ?? "-"}
      </span>
    </div>
  );
}
