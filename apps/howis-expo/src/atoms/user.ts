import { atom } from "jotai";

const User = {
  name: "",
  image: { public_id: "" },
  isUploading: false,
  isLoggedIn: false,
};

export const userAtom = atom(User);

export const showModalAtom = atom(false);
