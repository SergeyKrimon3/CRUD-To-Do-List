export const url = "https://09d7-2804-1b3-a9c0-2e86-d480-128b-6fd2-53.ngrok-free.app" 

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