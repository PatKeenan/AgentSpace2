import React from "react";
import { Button } from "@/components-common/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components-common/ui/Card";

import subscriptionPlans from "@/fixtures/subscriptions.json";
import { WorkspaceLayout } from "./WorkspaceLayout";

export const AddWorkspaceScreen = () => {
  // handle the creation of a workspace after choosing a subscription plan

  const Header = () => (
    <div>
      <p className="text-2xl font-medium">
        Choose a plan for your new workspace
      </p>
      <p className="text-muted-foreground">
        Dont worry, you can change it later
      </p>
    </div>
  );

  return (
    <WorkspaceLayout>
      <div>
        {/* {subscriptionPlans.map((plan) => (
          <Card
            className="mx-auto h-full w-full max-w-md flex-grow text-left"
            key={plan.title}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{plan.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className="my-4 text-3xl tracking-wide">
                <span className="mr-1 text-2xl text-muted-foreground">$</span>
                {plan.price}
                <span className="ml-2 text-sm">/month</span>
              </p>

              <CardDescription className=" h-12">
                {plan.description}
              </CardDescription>
              <Button className="w-full" onClick={() => {}}>
                Choose {plan.title}
              </Button>
              <p>Features</p>
              <ul className="list-disc space-y-1 pl-6 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))} */}
      </div>
    </WorkspaceLayout>
  );
};
