export interface Client {
    id: number | null;
    name: string;
    relationshipStart: Date;
    addressCity: string;
    addressPostalCode: string;
    addressStreet: string;
    addressApt: string;
    activityType: string;
    infoEmail: string;
}
