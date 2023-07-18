import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Header = ({
  location,
}: {
  location: "homeScreen" | "workspaceScreen";
}) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b bg-white py-3">
      <div className="absolute inset-y-0 ml-3 flex items-center">
        <div>Logo</div>
      </div>
      <div className="container flex justify-end">
        <nav className="flex items-center gap-x-3">
          {location == "workspaceScreen" && <WorkspaceScreenNav />}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </nav>
      </div>
    </header>
  );
};

const WorkspaceScreenNav = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Link
        href={`/workspaces/${router.query.workspaceId as string}/settings`}
        className="text-muted-foreground"
      >
        Settings
      </Link>
    </React.Fragment>
  );
};
