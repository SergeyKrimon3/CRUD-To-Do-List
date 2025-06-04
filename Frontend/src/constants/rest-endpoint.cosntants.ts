//JSON Server Integrated With Vercel

export const RestEndpoint = {
    tasks: {
        getAllTasks: "https://json-server-teal-two.vercel.app/tasks",
        createTasks: "https://json-server-teal-two.vercel.app/tasks",
        getTaskById: (taskId: string) => `https://json-server-teal-two.vercel.app/tasks/${taskId}`,
        updateTaskById: (taskId: string) => `https://json-server-teal-two.vercel.app/tasks/${taskId}`,
        deleteTask: (taskId: string) => `https://json-server-teal-two.vercel.app/tasks/${taskId}`,
        updateStatusTask: (taskId: string) => `https://json-server-teal-two.vercel.app/tasks/${taskId}`
    }
}