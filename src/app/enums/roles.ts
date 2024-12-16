
export enum Role {
    Admin = 1,
    Planner = 2,
    User = 3
}

export const roles = new Map<number, string>([
    [Role.Admin, "Admin"],
    [Role.Planner, "Planner"],
    [Role.User, "User"]
]);
