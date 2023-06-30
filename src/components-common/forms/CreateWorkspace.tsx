import React from "react";
import { useOrganizationList } from "@clerk/nextjs";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";

export const CreateWorkspace = () => {
  const { createOrganization, setActive } = useOrganizationList();
  const [organizationName, setOrganizationName] = React.useState("");

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const organization = await createOrganization?.({ name: organizationName });
    console.log({ organization });
    setOrganizationName("");
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="organizationName"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.currentTarget.value)}
          />
          <Button type="submit">Create organization</Button>
        </form>
      </CardContent>
    </Card>
  );
};
