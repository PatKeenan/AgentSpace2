import { ModalSlice, useGlobalStore } from "@/lib-client/hooks/useGlobalStore";

export const useModal = () =>
  useGlobalStore<ModalSlice>((store) => ({
    open: store.open,
    modalContent: store.modalContent,
    setModalContent: store.setModalContent,
    setOpen: store.setOpen,
    setModalState: store.setModalState,
  }));
