import {z} from 'zod'
import { Role } from '@prisma/client'

export class WorkspaceUserSchema {
    public static addUser_Client = z.object({
        email: z.string().email("Invalid email address"),
        role: z.nativeEnum(Role, {'required_error': 'Role is required'}),
    })
    public static addUser_Server = z.object({
        workspaceId: z.string({'required_error': 'Workspace ID is required'}),
    }).merge(WorkspaceUserSchema.addUser_Client)
}
export type WorkspaceUserSchemaType = {
    addUser_Client: z.infer<typeof WorkspaceUserSchema.addUser_Client>
    addUser_Server: z.infer<typeof WorkspaceUserSchema.addUser_Server>
}