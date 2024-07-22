type Props = {
  title: string;
};

export default function AdvertisementListNoResults({ title }: Props) {
  return (
    <div className="flex flex-col justify-center w-full items-center gap-y-4 px-4 sm:px-16 py-4 sm:py-8">
      <h3 className="text-3xl font-bold text-center">{title}</h3>
    </div>
  );
}
