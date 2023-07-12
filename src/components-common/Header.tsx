import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const Header = ({
  location,
}: {
  location: "homeScreen" | "workspaceScreen";
}) => {
  return (
    <header className="relative h-16 border-b py-3">
      <div className="absolute inset-y-0 ml-3 flex items-center">
        <div>Logo</div>
      </div>
      <div className="container flex justify-end">
        <nav className="flex gap-x-3">
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
  return (
    <>
      <div>Home</div>
      <div>Workspaces</div>
      <div>Profile</div>
    </>
  );
};
