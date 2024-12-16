
// User model
export interface RepRecUser {
    id: string;
    email: string;
    emailVerified: boolean,
    nickname?: string;
    createdAt?: string;
    userRoles?: { roleId: number, userId: string }[];
}
