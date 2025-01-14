
export interface PlanWorkoutExercise {
    id: number;
    userId: string;
    planWorkoutId: number;
    optExerciseCategoryId: number;
    optExerciseId: number;
    dayIndex: number;
    dayOrder: number;
    exerciseDefinitionJson: string; // Dynamic JSON
}
