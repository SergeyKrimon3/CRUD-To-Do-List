export const url = "https://3597-2804-1b3-a9c0-2e86-b365-3cf3-ffb4-963b.ngrok-free.app" 

export const RestEndpoint = {
    tasks: {
        getAllTasks: url + "/api/tasks",
        createTasks: url + "/api/tasks",
        getTaskById: (taskId: string) => url + `/api/tasks/${taskId}`,
        updateTaskById: (taskId: string) => url + `/api/tasks/${taskId}`,
        deleteTask: (taskId: string) => url + `/api/tasks/${taskId}`,
        updateStatusTask: (taskId: string) => url + `/api/tasks/${taskId}`
    }
}