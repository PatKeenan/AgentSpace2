import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components-common/ui/Dialog";
import { useModal } from "@/lib-client/hooks/useModal";

export const RootModal = () => {
  const { open, modalContent } = useModal();

  const Content = React.useCallback(() => {
    switch (modalContent) {
      case "Not authorized":
        return <NotAuthorized />;
      case "Error":
        return <Error />;
      case "Not found":
        return <NotFound />;
      case "Loading":
        return <Loading />;
      default:
        return null;
    }
  }, [modalContent]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <Content />
      </DialogContent>
    </Dialog>
  );
};

const NotAuthorized = () => (
  <DialogHeader>
    <DialogTitle>Unauthorized</DialogTitle>
    <DialogDescription>
      You are not authorized to view this workspace. Please contact your
      workspace owner for access.
    </DialogDescription>
  </DialogHeader>
);

const Error = () => (
  <DialogHeader>
    <DialogTitle>Error</DialogTitle>
    <DialogDescription>
      Something went wrong. Please try again.
    </DialogDescription>
  </DialogHeader>
);

const NotFound = () => (
  <DialogHeader>
    <DialogTitle>Not found</DialogTitle>
    <DialogDescription>
      The resource you are looking for could not be found.
    </DialogDescription>
  </DialogHeader>
);

const Loading = () => (
  <DialogHeader>
    <DialogTitle>Loading</DialogTitle>
    <DialogDescription>Please wait while we load your data.</DialogDescription>
  </DialogHeader>
);

const Success = () => (
  <DialogHeader>
    <DialogTitle>Success</DialogTitle>
    <DialogDescription>Your request was successful.</DialogDescription>
  </DialogHeader>
);

const NotSignedIn = () => (
  <DialogHeader>
    <DialogTitle>Not signed in</DialogTitle>
    <DialogDescription>
      You must be signed in to view this page.
    </DialogDescription>
  </DialogHeader>
);
