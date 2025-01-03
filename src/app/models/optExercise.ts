
export interface OptExercise {
    id: number;
    name: string;
    optExerciseCategoryId: number;
    level: string;
    primaryMuscles: string;     // Comma separated
    secondaryMuscles?: string;  // Comma separated
    mechanic?: string;
    force?: string;
    equipment?: string;
    instructions?: string;
}
