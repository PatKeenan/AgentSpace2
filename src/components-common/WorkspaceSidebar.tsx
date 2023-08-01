import { useWorkspaceAuthStore } from "@/lib-client/hooks/useWorkspaceAuth";
import {
  HomeIcon,
  type LucideIcon,
  UsersIcon,
  ClipboardCheckIcon,
} from "lucide-react";
import { cn } from "@/lib-client/utils";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { CheckCheckIcon } from "lucide-react";

type WorkspaceSidebarProps = {
  activeItem?: NavItemOptions;
};

export type NavItemOptions = "Dashboard" | "Contacts" | "Tasks" | "Checklists";

const navItems: { title: NavItemOptions; href: string; icon: LucideIcon }[] = [
  { title: "Dashboard", href: "", icon: HomeIcon },
  { title: "Contacts", href: "contacts", icon: UsersIcon },
  { title: "Tasks", href: "tasks", icon: ClipboardCheckIcon },
  { title: "Checklists", href: "checklists", icon: CheckCheckIcon },
];

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  activeItem = "Dashboard",
}) => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;
  return (
    <aside className="fixed h-full w-60 overflow-hidden py-4">
      <div className="flex flex-col">
        {navItems.map((item) => (
          <div className="flex w-full py-2 pl-6" key={item.title}>
            {
              <Link
                href={`/workspaces/${workspaceId || ""}${
                  item.href ? "/" + item.href : ""
                }`}
                className={cn(
                  activeItem == item.title
                    ? "bg-gray-100"
                    : "hover:bg-gray-100",
                  "flex w-full items-center gap-x-3 rounded-md px-4 py-2"
                )}
              >
                <item.icon size={18} />
                {item.title}
              </Link>
            }
          </div>
        ))}
      </div>
    </aside>
  );
};
