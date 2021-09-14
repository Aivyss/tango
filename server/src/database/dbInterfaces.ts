export interface DeckTable {
    DECK_ID: number;
    CREATE_DATE: string;
    DECK_NAME: string;
    USER_ID: number;
    DEPTH: number;
}
export interface FrontCardTable {
    FRONT_ID: number;
    CREATE_DATE: string;
    FRONT_DATA: string;
    DECK_ID: number;
    E_FACTOR: number;
    REPETITION: number;
    DUE_DATE: string;
    KIND_ID: number;
}
export interface KindTable {
    KIND_ID: number;
    CARD_NAME: string;
    USER_ID: number;
}
export interface ColsTable {
    CARD_COL_ID: number;
    KIND_ID: number;
    COL_NAME: string;
}
export interface UserTable {
    ID: number;
    STRING_ID: string;
    PASSWORD: string;
    CREATE_DATE: string;
    IS_DELETED: number;
    PW_SALT: string;
}
export interface BackCardTable {
    BACK_ID: number;
    FRONT_ID: number;
    CARD_COL_ID: number;
    BACK_DATA: string;
}

export interface BoardCategTable {
    BOARD_PK: number;
    CATEG_NAME: string;
}
