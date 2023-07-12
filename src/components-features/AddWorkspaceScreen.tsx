import React from "react";
import { Button } from "@/components-common/ui/Button";

import {
  Form,
  FormControl,
  FormDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Main } from "@/components-common/Main";
import { WorkspaceSchema } from "@/lib-server/schemas/WorkspaceSchemas";
import { trpcApi } from "@/lib-client/services/trpc-api";
import { useRouter } from "next/router";
import { useToast } from "@/lib-client/hooks/useToast";
import { ToastAction } from "@/components-common/ui/Toast";

export const AddWorkspaceScreen = () => {
  const router = useRouter();
  const utils = trpcApi.useContext();

  const { toast } = useToast();

  const { mutate, isLoading } = trpcApi.workspace.create.useMutation({
    onSuccess: (data) => {
      utils.workspace.list.invalidate();
      router.push(`/workspaces/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction altText="Try again" onClick={handleSubmit}>
            Try again
          </ToastAction>
        ),
      });
      console.error(error);
    },
  });

  // handle the creation of a workspace after choosing a subscription plan
  const form = useForm<{
    name: string;
    plan: string;
  }>({
    resolver: zodResolver(WorkspaceSchema.create),
  });

  const workspaceName = form.watch("name");

  const handleSubmit = form.handleSubmit(async (data) => {
    mutate(data);
  });

  const userWorkspaces = utils.workspace.list.getData();
  const hasWorkspaces = userWorkspaces ? userWorkspaces?.length > 0 : false;

  return (
    <Screen>
      <Header location="homeScreen" />
      <Main>
        <div className="mt-8 grid h-full w-full flex-grow grid-cols-5 gap-8">
          <div className="col-span-2">
            <h3 className="mb-8 text-2xl">Let's create a workspace</h3>

            <div className="max-w-lg">
              <Form {...form}>
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workspace Name</FormLabel>

                        <FormControl>
                          <Input placeholder="" autoComplete="off" {...field} />
                        </FormControl>
                        {form.formState.errors.name && (
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
                        <FormDescription>
                          <span className=" cursor-pointer font-light text-blue-700 hover:underline">
                            Learn more
                          </span>{" "}
                          about the different plans
                        </FormDescription>

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
                    {hasWorkspaces && (
                      <Button asChild variant="ghost">
                        <Link href="/">Cancel</Link>
                      </Button>
                    )}
                    <Button
                      type="submit"
                      disabled={
                        workspaceName ? workspaceName?.trim().length < 4 : true
                      }
                    >
                      {isLoading ? " Loading..." : "Continue"}
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
