import {
  WorkspaceAuthSlice,
  useGlobalStore,
} from "@/lib-client/hooks/useGlobalStore";

export const useWorkspaceAuthStore = () =>
  useGlobalStore<WorkspaceAuthSlice>((store) => ({
    user: store.user,
    workspaceId: store.workspaceId,
    setState: store.setState,
    setUser: store.setUser,
    setWorkspaceId: store.setWorkspaceId,
  }));
