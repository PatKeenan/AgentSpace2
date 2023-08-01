import React from "react";
import { WorkspaceLayout } from "@/components-common/WorkspaceLayout";
import { PageTitle } from "@/components-common/PageTitle";
import { useRouter } from "next/router";
import {
  ArrowLeftIcon,
  EyeOff,
  MoreHorizontalIcon,
  PlusIcon,
} from "lucide-react";
import { Button } from "@/components-common/ui/Button";

import { Input } from "@/components-common/ui/Input";
import { Label } from "@/components-common/ui/Label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components-common/ui/Card";
import { Textarea } from "@/components-common/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components-common/ui/DropdownMenu";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components-common/ui/Select";

export const ContactDetailsScreen = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);

  const router = useRouter();

  React.useLayoutEffect(() => {
    if (!router.pathname.includes("new")) {
      setIsEditMode(true);
    }
  }, [router.pathname]);
  return (
    <WorkspaceLayout activeNavItem="Contacts">
      <PageTitle
        backLink={{
          title: "Back",
          href: `/workspaces/${router.query.workspaceId as string}/contacts`,
          icon: ArrowLeftIcon,
        }}
      >
        {isEditMode ? "Edit" : "New"} Contact
      </PageTitle>
      <div className="mt-8 w-full max-w-6xl">
        <form className="flex gap-x-16">
          <div className="flex-grow space-y-6">
            <ContactSection
              title="General Information"
              description="Simple Information about the contact"
              actions={
                <>
                  <DropdownMenuItem>
                    <EyeOff size={14} className="mr-2" /> Hide
                  </DropdownMenuItem>
                </>
              }
            >
              <div className="flex flex-col gap-y-4">
                <div className="flex space-x-4">
                  <div className="w-64">
                    <Label>First Name</Label>
                    <Input value="Tico" />
                  </div>
                  <div className="w-64">
                    <Label>Last Name</Label>
                    <Input value="Bico" />
                  </div>
                </div>
                <div>
                  <Label>About</Label>
                  <Textarea rows={5} value="Bico" />
                </div>
              </div>
            </ContactSection>
            <ContactSection
              title="Contact Information"
              description="Simple Information about the contact"
              actions={
                <>
                  <DropdownMenuItem>
                    <EyeOff size={14} className="mr-2" /> Hide
                  </DropdownMenuItem>
                </>
              }
            >
              <div className="flex w-full gap-x-12">
                <div className="w-1/2">
                  <Label>Email</Label>
                  <div className="mb-3">
                    <div className="flex items-center space-x-3">
                      <Input />
                      <div className="flex space-x-2">
                        {/*  <Checkbox /> */}
                        <Label className="text-muted-foreground">Primary</Label>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <PlusIcon className="mr-1" size={14} />
                    Add another
                  </Button>
                </div>
                <div className="w-1/2">
                  <Label>Phone</Label>
                  <div className="mb-3">
                    <div className="flex items-center space-x-3">
                      <Input />
                      <div className="flex space-x-2">
                        <Label className="text-muted-foreground">Primary</Label>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <PlusIcon className="mr-1" size={14} /> Add another
                  </Button>
                </div>
              </div>
            </ContactSection>
            <ContactSection
              title="Mailing Address"
              description="Simple Information about the contact"
              actions={
                <>
                  <DropdownMenuItem>
                    <EyeOff size={14} className="mr-2" /> Hide
                  </DropdownMenuItem>
                </>
              }
            >
              <div>
                <div className="space-y-6">
                  <div className="max-w-[400px]">
                    <Label className="mb-1">Country</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="United States" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Mexico">Mexico</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex w-full gap-x-6">
                    <div className="w-full">
                      <Label>Street Address</Label>
                      <Input />
                    </div>
                    <div className=" w-1/6 max-w-[140px]">
                      <Label>Building/Apt</Label>
                      <Input />
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-3 gap-x-6">
                    <div>
                      <Label>City</Label>
                      <Input />
                    </div>
                    <div>
                      <Label>State / Province</Label>
                      <Input />
                    </div>
                    <div>
                      <Label>ZIP / Postal code</Label>
                      <Input />
                    </div>
                  </div>
                </div>
              </div>
            </ContactSection>
            <ContactSection
              title="Urls"
              description="Simple Information about the contact"
              actions={
                <>
                  <DropdownMenuItem>
                    <EyeOff size={14} className="mr-2" /> Hide
                  </DropdownMenuItem>
                </>
              }
            >
              <div className="flex flex-col gap-3">
                <Input placeholder="https://www.instagram.com/username" />
                <Input placeholder="https://www.facebook.com/username" />
                <Input placeholder="https://www.linkdeln.com/username" />
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <PlusIcon className="mr-1" size={14} /> Add Url
                </Button>
              </div>
            </ContactSection>
          </div>
        </form>
      </div>
    </WorkspaceLayout>
  );
};

type ContactSectionProps = {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  description,
  actions,
  children,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-baseline justify-between">
          <div>{title}</div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-2"
              >
                <MoreHorizontalIcon size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">{actions}</DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
