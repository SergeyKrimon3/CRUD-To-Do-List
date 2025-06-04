export const url = "https://3597-2804-1b3-a9c0-2e86-b365-3cf3-ffb4-963b.ngrok-free.app" 

export const RestEndpoint = {
    tasks: {
        getAllTasks: url + "/tasks",
        createTasks: url + "/tasks",
        getTaskById: (taskId: string) => url + `/tasks/${taskId}`,
        updateTaskById: (taskId: string) => url + `/tasks/${taskId}`,
        deleteTask: (taskId: string) => url + `/tasks/${taskId}`,
        updateStatusTask: (taskId: string) => url + `/tasks/${taskId}`
    }
}