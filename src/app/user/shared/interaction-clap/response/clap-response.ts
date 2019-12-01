import { UserInfo } from 'src/app/user/entity-protected/profile/user-info';

export class ClapResponse {
    success: boolean;
    value: {
        Data: {
            id: number;
            client: UserInfo;
            date: {
                timezone: { name: string }; 
                timestamp: number;
            };
            entity: {
                id: number; 
                name: string
            }
            row: number;
            value: number;
        }
    }
}