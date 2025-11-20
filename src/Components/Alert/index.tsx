import * as React from "react";

type AlertVariant = "default" | "destructive";

interface AlertProps extends React.ComponentProps<"div"> {
  variant?: AlertVariant;
}

type AlertTitleProps = React.ComponentProps<"div">
type AlertDescriptionProps = React.ComponentProps<"div">

const variantClasses: Record<AlertVariant, string> = {
  default: "bg-white text-gray-900 border border-gray-200",
  destructive: "bg-red-50 text-red-700 border border-red-200",
};

function Alert({ className = "", variant = "default", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border px-4 py-3 grid grid-cols-[0_1fr] gap-y-0.5 items-start has-[>svg]:grid-cols-[calc(1rem*4)_1fr] has-[>svg]:gap-x-3 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

function AlertTitle({ className = "", ...props }: AlertTitleProps) {
  return (
    <div
      className={`col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight ${className}`}
      {...props}
    />
  );
}

function AlertDescription({ className = "", ...props }: AlertDescriptionProps) {
  return (
    <div
      className={`text-gray-600 col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
