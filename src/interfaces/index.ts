// Navbar Links
export interface ILink {
    label: string;
    path: string;
    privateRoute: boolean;
}

export interface IGenre {
    name: string,
    id: number,
    active?: boolean,
    style?: string
}

export interface ISHOW_TYPES {
    label: string;
    value: "all" | "movie" | "tv"
}

export interface IShow {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    media_type?: string;
    vote_average: number;
}

export interface IFORM_FIELD {
    name: string;
    placeholder: string;
    type: string;
    style?: string;
}

export interface ILOGIN_FROM extends IFORM_FIELD {
    name: "email" | "password";
}

export interface ISIGNUP_FROM extends IFORM_FIELD {
    name: "name" | "email" | "password";
}

export interface ISIGNUP_FORM_DATA {
    name: string
    email: string
    password: string
}
export interface ISIGNIN_FORM_DATA {
    email: string
    password: string
}

export interface IBilboard {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title?: string;
    name?: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    media_type: string
    vote_average: number;
}

export interface IErrorResponse {
    message?: string,
    statusCode: number
}

export interface IData_show {
    id: number,
    title: string | undefined,
    overview: string,
    poster_path: string | null,
    release_date: string | undefined,
    vote_average: string,
    media_type: string | undefined
}

export interface ICast {
    id: number,
    name: string,
    profile_path: string | null
}

interface BaseInput {
    label: string;
    type: string;
    id: string;
}

export interface IEDIT_NAME_INPUTS extends BaseInput {
    name:  "name" | "password";
}

export interface IEDIT_NAME_DATA  {
    name : string;
    password?: string;
}


export interface IEDIT_EMAIL_INPUTS extends BaseInput {
    name:  "email" | "password";
}

export interface IEDIT_EMAIL_DATA  {
    email : string;
    password: string;
}


export interface IEDIT_PASSWORD_INPUTS extends BaseInput {
    name:  "password" | "newpassword";
}

export interface IEDIT_PASSWORD_DATA  {
    password : string;
    newpassword: string;
}