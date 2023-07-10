import { create } from "zustand";
import { StateCreator } from "zustand";
import { WorkspaceUser } from "@prisma/client";

export type WorkspaceAuthSlice = {
  user?: WorkspaceUser;
  workspaceId?: string;
  setUser: (user?: WorkspaceUser) => void;
  setWorkspaceId: (workspaceId?: string) => void;
  setState: (state: Partial<WorkspaceAuthSlice>) => void;
};

export const createWorkspaceAuthSlice: StateCreator<
  WorkspaceAuthSlice,
  [],
  [],
  WorkspaceAuthSlice
> = (set, get) => ({
  user: undefined,
  workspaceId: undefined,
  setUser: (user?: WorkspaceUser) => set({ user }),
  setWorkspaceId: (workspaceId?: string) => set({ workspaceId }),
  setState: (state) => set((st) => ({ ...st, ...state })),
});

export const useGlobalStore = create<WorkspaceAuthSlice>()((...a) => ({
    ...createWorkspaceAuthSlice(...a),
}))