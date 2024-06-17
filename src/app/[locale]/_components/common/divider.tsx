type Props = {
  text: string;
};

export function Divider({ text }: Props) {
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
