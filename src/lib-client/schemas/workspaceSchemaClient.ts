import {z} from 'zod'

type CreateWorkspaceClientSchema = z.infer<typeof WorkspaceSchemaClient.create>



export  class WorkspaceSchemaClient {
    public static create = z.object({
        name: z.string().min(3, "Workspace name must be at least 3 characters long").max(50, "Workspace name must be less than 50 characters long"),
    })
    
    public static update = WorkspaceSchemaClient.create

}