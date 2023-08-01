import { cn } from "@/lib-client/utils";

const typographySizes = {
  h1: "text-4xl",
  h2: "text-3xl",
  h3: "text-2xl",
  h4: "text-xl",
  h5: "text-lg",
  h6: "text-base",
  body: "text-base",
  small: "text-sm",
  tiny: "text-xs",
};

const typographyWeights = {
  bold: "font-bold",
  semiBold: "font-semibold",
  normal: "font-normal",
  light: "font-light",
  thin: "font-thin",
};

const typographyColors = {
  foreground: "text-foreground",
  foregroundMuted: "text-muted-foreground",
  secondary: "text-secondary",
};

const themeOptions = {
  pageTitle: cn(
    typographyColors.foreground,
    typographyWeights.semiBold,
    typographySizes.h2,
    "leading-none tracking-tight"
  ),
};

type TypographyProps = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof typographySizes;
  weight?: keyof typeof typographyWeights;
  color?: keyof typeof typographyColors;
  theme?: keyof typeof themeOptions;
};

export const Typography: React.FC<TypographyProps> = ({
  as: As = "p",
  className,
  size = "body",
  weight = "normal",
  color = "foreground",
  children,
  theme,
}) => (
  <As
    className={cn(
      typographySizes[size],
      typographyColors[color],
      typographyWeights[weight],
      theme && themeOptions[theme],
      className
    )}
  >
    {children}
  </As>
);

export const H1 = (props: TypographyProps) => (
  <Typography as="h1" size="h1" weight="normal" theme="pageTitle" {...props} />
);
export const H2 = (props: TypographyProps) => (
  <Typography as="h2" size="h2" {...props} />
);
export const H3 = (props: TypographyProps) => (
  <Typography as="h3" size="h3" {...props} />
);
export const H4 = (props: TypographyProps) => (
  <Typography as="h4" size="h4" {...props} />
);
export const H5 = (props: TypographyProps) => (
  <Typography as="h5" size="h5" {...props} />
);
export const H6 = (props: TypographyProps) => (
  <Typography as="h6" size="h6" {...props} />
);
export const Body = (props: TypographyProps) => (
  <Typography as="p" size="body" {...props} />
);
export const Small = (props: TypographyProps) => (
  <Typography as="p" size="small" {...props} />
);
export const Tiny = (props: TypographyProps) => (
  <Typography as="p" size="tiny" {...props} />
);
