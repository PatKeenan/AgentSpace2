import {z} from 'zod'

export class WorkspaceSchema {
    public static create = z.object({
        name: z.string().min(3, "Workspace name must be at least 3 characters long").max(50, "Workspace name must be less than 30 characters long"),
    })
}

export type WorkspaceSchemaType = {
    create: z.infer<typeof WorkspaceSchema.create>
}