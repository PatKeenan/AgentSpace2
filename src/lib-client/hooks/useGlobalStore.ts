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
  WorkspaceAuthSlice
> = (set, get) => ({
  user: undefined,
  workspaceId: undefined,
  setUser: (user?: WorkspaceUser) => set({ user }),
  setWorkspaceId: (workspaceId?: string) => set({ workspaceId }),
  setState: (state) => set((st) => ({ ...st, ...state })),
});


export type ModalContentOptions =  "Not signed in" | "Not authorized" | "Not found" | "Error" | "Success" | "Loading" | "None" 

export type ModalSlice = {
    open: boolean
    setOpen: (open: boolean) => void
    modalContent: ModalContentOptions
    setModalContent: (content: ModalContentOptions) => void
    setModalState: (state: Partial<ModalSlice>) => void
}

export const createModalSlice: StateCreator<ModalSlice> = (set, get) => ({
    open: false,
    setOpen: (open) => set({ open }),
    modalContent: "None",
    setModalContent: (modalContent) => set({ modalContent }),
    setModalState: (state) => set((st) => ({ ...st, ...state })),
})


export const useGlobalStore = create<WorkspaceAuthSlice & ModalSlice>()((...a) => ({
    ...createWorkspaceAuthSlice(...a),
    ...createModalSlice(...a)
}))