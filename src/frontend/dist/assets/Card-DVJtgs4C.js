import { j as jsxRuntimeExports, an as Slot, a as cn, ao as cva } from "./index-CeuI7PIL.js";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-gradient-primary text-primary-foreground shadow-card hover:shadow-elevated hover:brightness-105",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",
        outline: "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "size-10"
      }
    },
    defaultVariants: { variant: "primary", size: "default" }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      type,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Card({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-card",
        className
      ),
      ...props
    }
  );
}
function CardHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex flex-col gap-1.5 p-6 pb-0", className),
      ...props
    }
  );
}
function CardTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h3",
    {
      className: cn(
        "font-display text-lg font-semibold tracking-tight",
        className
      ),
      ...props
    }
  );
}
function CardDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm text-muted-foreground", className), ...props });
}
function CardContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-6", className), ...props });
}
function CardFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex items-center p-6 pt-0", className), ...props });
}
export {
  Button as B,
  Card as C,
  CardContent as a,
  CardHeader as b,
  CardTitle as c,
  CardDescription as d,
  CardFooter as e
};
