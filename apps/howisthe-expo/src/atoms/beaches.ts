import beaches from '../beaches';
import { atom } from 'jotai';

export type beachTypes = 'fl' | 'pt' | 'es' | 'fr' | 'uk';

export const currentLocationAtom = atom<beachTypes>('fl');

export const getCurrentBeachesAtom = atom(
  (get) => beaches?.[get(currentLocationAtom)].beaches
);
