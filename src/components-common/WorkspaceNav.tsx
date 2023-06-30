import Link from "next/link";
import React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components-common/ui";

const workspaceNav = ["", "settings"];

export const WorkspaceNav = () => {
  return (
    <header className="border-b px-6 pb-4 pt-3">
      <div className="mx-auto flex max-w-6xl">
        <div>
          <p className="text-2xl tracking-widest">Logo</p>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {workspaceNav.map((item, idx) => (
              <NavigationMenuItem key={`${item}-${idx}`}>
                <Link
                  href={`/workspace/asdasd/` + item}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    active={item == ""}
                    className={navigationMenuTriggerStyle()}
                  >
                    <span className="capitalize">
                      {item ? item : "Dashboard"}
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
