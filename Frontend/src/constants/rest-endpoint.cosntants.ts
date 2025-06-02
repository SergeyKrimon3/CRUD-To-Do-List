export const RestEndpoint = {
    tasks: {
        getAllTasks: "/api/tasks",
        createTasks: "/api/tasks",
        getTaskById: (taskId: string) => `/api/tasks/${taskId}`,
        updateTaskById: (taskId: string) => `/api/tasks/${taskId}`,
        deleteTask: (taskId: string) => `/api/tasks/${taskId}`,
        updateStatusTask: (taskId: string) => `/api/tasks/${taskId}`
    }
}