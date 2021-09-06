import {atom} from 'recoil';
import {EDialog, EAccount, EDeck, ECard} from './keys';
import {DeckTable, FrontCardTable, KindTable, ColsTable, UserTable, BackCardTable, IStudyCard} from './dbs';

export type {DeckTable, FrontCardTable, KindTable, ColsTable, UserTable, BackCardTable, IStudyCard};

// *Account Atoms
export const isLoginedState = atom<boolean>({
    key: EAccount.HANDLE_LOGIN,
    default: false,
});

// *Dialog Atoms
export const lDOpenState = atom<boolean>({
    key: EDialog.HANDLE_LOGIN_DIALOG,
    default: true,
});
export const sDOpenState = atom<boolean>({
    key: EDialog.HANDLE_SIGN_UP_DIALOG,
    default: false,
});
export const dDOpenState = atom<boolean>({
    key: EDialog.HANDLE_CREATE_DECK_DIALOG,
    default: false,
});
export const cCDOpenState = atom<boolean>({
    key: EDialog.HANDLE_CREATE_CARD_CATEGORY_DIALOG,
    default: false,
});
export const cDOpenState = atom<boolean>({
    key: EDialog.HANDLE_CREATE_CARD_DIALOG,
    default: false,
});
export const nDOpenState = atom<boolean>({
    key: EDialog.HANDLE_SIDE_NAV_BAR,
    default: false,
});
export const smDOpenState = atom<boolean>({
    key: EDialog.HANDLE_STUDY_MODE_DIALOG,
    default: false,
});

// *Deck Atoms
export const allDeckState = atom<DeckTable[]>({
    key: EDeck.SET_ALL_DECK,
    default: [],
});
export const targetDeckIdState = atom<number | undefined>({
    key: EDeck.SET_DECK_ID,
    default: undefined,
});
export const deckInfoState = atom<{newCard: number; reviewCard: number}>({
    key: EDeck.SET_DECK_INFO,
    default: {newCard: 0, reviewCard: 0},
});
export const deckNameState = atom<string | undefined>({
    key: EDeck.SET_DECK_NAME,
    default: undefined,
});
export const studyCardsState = atom<IStudyCard[]>({
    key: EDeck.SET_STUDY_CARDS,
    default: [],
});

// *Card Atoms
export const cardKindState = atom<KindTable[]>({
    key: ECard.SET_ALL_CARD_CATEGORIES,
    default: [],
});
export const targetCardIdState = atom<number | undefined>({
    key: ECard.SET_TARGET_CARD,
    default: undefined,
});
export const targetCardColsState = atom<ColsTable[]>({
    key: ECard.SET_TARGET_CARDS_COLS,
    default: [],
});
