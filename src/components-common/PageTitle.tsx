import { type LucideIcon } from "lucide-react";
import { H2 } from "./ui/Typography";
import Link from "next/link";
import { Button } from "./ui/Button";

type PageTitleProps = {
  children: React.ReactNode;
  backLink?: { title: string; href: string; icon?: LucideIcon };
};

export const PageTitle: React.FC<PageTitleProps> = ({ children, backLink }) => (
  <div className="flex space-x-4">
    {backLink && (
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link
          href={backLink.href}
          /*  className="flex items-center space-x-2 text-sm text-muted-foreground" */
        >
          {backLink.icon && <backLink.icon size={14} />}
          {backLink.title}
        </Link>
      </Button>
    )}

    <H2 theme="pageTitle">{children}</H2>
  </div>
);
