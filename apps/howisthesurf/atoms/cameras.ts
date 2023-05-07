import { atom } from 'jotai';
import { beachTypes } from './beaches';
import beaches from '../beaches';

export type Camera = {
  name: string;
  url: string;
};

export type CamerasAtomType = {
  [key in beachTypes]: Camera[];
};

export const camerasAtom = atom<CamerasAtomType>({
  fl: [beaches.fl.beaches[0]],
  pt: [beaches.pt.beaches[0]],
  es: [beaches.es.beaches[0]],
  fr: [beaches.fr.beaches[0]],
  uk: [beaches.uk.beaches[0]],
});
