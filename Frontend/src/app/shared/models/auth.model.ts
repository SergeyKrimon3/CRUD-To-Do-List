export interface IAuth {
    cpf: string;
    password: string | null;
}

export interface IAuthResponse {
    avatar_status: string;
    bill_of_sale_emission: boolean;
    email: string;
    has_document: boolean;
    has_ownconduction: boolean;
    has_password: boolean;
    id: number;
    is_admin: boolean;
    is_manager: boolean;
    name: string;
}

export interface IAuthProfiles {
    id: number;
    name: string;
}