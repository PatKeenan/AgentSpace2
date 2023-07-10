import React from "react";
import { Button } from "@/components-common/ui/Button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components-common/ui/Form";

import subscriptionPlans from "@/fixtures/subscriptions.json";
import { Input } from "@/components-common/ui/Input";
import { useForm } from "react-hook-form";
import {
  WorkspaceCard,
  WorkspaceCardContainer,
} from "@/components-common/WorkspaceCard";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components-common/ui/Select";
import { Screen } from "@/components-common/Screen";
import { Header } from "@/components-common";
import { Main } from "@/components-common/Main";

export const AddWorkspaceScreen = () => {
  // handle the creation of a workspace after choosing a subscription plan
  const form = useForm<{
    workspaceName: string;
    plan: string;
  }>();

  const workspaceName = form.watch("workspaceName");
  return (
    <Screen>
      <Header location="homeScreen" />
      <Main>
        <div className="mt-8 grid h-full w-full flex-grow grid-cols-5 gap-8">
          <div className="col-span-2">
            <h3 className="mb-8 text-2xl">Let's create a workspace</h3>
            <div className="max-w-lg">
              <Form {...form}>
                <form className="space-y-8">
                  <FormField
                    control={form.control}
                    name="workspaceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workspace Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" autoComplete="off" {...field} />
                        </FormControl>
                        {form.formState.errors.workspaceName && (
                          <FormMessage>test</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={subscriptionPlans[0]?.title || "t"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subscriptionPlans.map((plan) => (
                              <SelectItem key={plan.title} value={plan.title}>
                                {plan.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-x-4">
                    <Button asChild variant="ghost">
                      <Link href="/">Cancel</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        workspaceName ? workspaceName?.trim().length < 4 : true
                      }
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <div className="col-span-3 grid h-full place-items-center rounded-lg bg-gray-200">
            <WorkspaceCardContainer>
              <WorkspaceCard
                title={workspaceName || "--"}
                updatedAt="Today"
                memberCount={1}
                plan={form.watch("plan")}
              />
            </WorkspaceCardContainer>
          </div>
        </div>
      </Main>
    </Screen>
  );
};
