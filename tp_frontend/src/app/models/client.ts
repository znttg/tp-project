export interface Client {
    id: number | null;
    name: string;
    relationship_start: Date;
    address_city: string;
    address_postal_code: string;
    address_street: string;
    address_apt: string;
    activity_type: number;
    info_email: string;
}
