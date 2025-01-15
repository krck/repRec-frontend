
// User model
export interface RepRecUser {
    id: string;
    email: string;
    emailVerified: boolean,
    nickname?: string;
    settingTimezone: string;
    settingWeightUnit: string;
    settingDistanceUnit: string;
    createdAt?: string;

    userRoles?: { roleId: number, userId: string }[];
}
