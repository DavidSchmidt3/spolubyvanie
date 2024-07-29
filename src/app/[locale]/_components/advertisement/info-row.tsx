type Props = {
  label: string;
  value?: number | string | null;
};

export default function InfoRow({ label, value }: Props) {
  return (
    <div>
      <p className="text-base md:text-lg font-bold">{label}</p>
      <span className="text-base md:text-lg text-right break-words">
        {value}
      </span>
    </div>
  );
}
