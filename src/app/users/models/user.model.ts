export enum UserDialogMode {
    add,
    update
}

export enum Gender {
    male = 'Male',
    female = 'Female',
    notsay = 'Rather not say'
}

export interface User {
    avatar: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    gender: Gender;
    email: string;
    mobile: string;
    address: string;
}