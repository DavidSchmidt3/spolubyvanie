import { cn } from "@/lib/utils";

type ContainerProps = {
  children?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  dataPending?: boolean;
};

export default function Container({
  children,
  fullWidth,
  className,
  dataPending,
}: ContainerProps) {
  return (
    <div
      className={cn("flex justify-center p-3 sm:p-6", className)}
      data-pending={dataPending}
    >
      <div className={cn("py-6", fullWidth ? "w-full" : "w-full sm:w-auto")}>
        {children}
      </div>
    </div>
  );
}
