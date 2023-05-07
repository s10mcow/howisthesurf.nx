import isBefore from "date-fns/isBefore";
import { atom } from "jotai";

export const feedbackAtom = atom({
  allMedia: [{ data: { tags: "sten" } }],
  createMediaProgress: 0,
  createMediaWorking: false,
  createMediaFailed: false,
  selected: "",
  fetchingMedia: false,
  showFeedback: false,
});

export const getAllMedia = atom((get) => get(feedbackAtom)?.allMedia);
