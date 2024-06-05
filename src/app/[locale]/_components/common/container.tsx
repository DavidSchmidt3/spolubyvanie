import { cn } from "@/lib/utils";

type ContainerProps = {
  children?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
};

export default function Container({
  children,
  fullWidth,
  className,
}: ContainerProps) {
  return (
    <div className={cn("flex justify-center p-3 sm:p-6", className)}>
      <div className={cn("py-6", fullWidth ? "w-full" : "w-full sm:w-auto")}>
        {children}
      </div>
    </div>
  );
}
