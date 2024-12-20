
export interface ErrorLog {
    timestamp: Date;
    level: string;
    userName: string;
    exceptionType: string;
    message: string;
    source: string;
}
