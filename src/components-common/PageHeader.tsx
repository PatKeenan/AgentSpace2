import { type LucideIcon } from "lucide-react";
import { H2 } from "./ui/Typography";
import Link from "next/link";
import { Button } from "./ui/Button";

type PageHeaderProps = {
  title: React.ReactNode;
  backLink?: { title: string; href: string; icon?: LucideIcon };
  pageActions?: React.ReactNode;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  backLink,
  pageActions,
}) => (
  <div className="flex justify-between">
    <div className="flex items-center space-x-6">
      {backLink && (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={backLink.href}
            /*  className="flex items-center space-x-2 text-sm text-muted-foreground" */
          >
            {backLink.icon && <backLink.icon size={14} />}
            {backLink.title}
          </Link>
        </Button>
      )}

      <H2 theme="pageTitle">{title}</H2>
    </div>
    <div className="flex items-center space-x-2">{pageActions}</div>
  </div>
);
