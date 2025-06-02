import { EStatusTasks } from "../enums/status.enum";

export interface ITasks {
    id: string;
    title: string;
    description: string;
    status: EStatusTasks;
    createdAt: string;
}

export type TTaskStatus = Pick<ITasks, 'status'>;

export type TTasks = Omit<ITasks, 'id'>;