import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { RestEndpoint } from '../../../constants/rest-endpoint.cosntants';
import { ITasks, TTasks } from '../models/tasks.model';
import { EStatusTasks } from '../enums/status.enum';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    public getAllTasks(): Observable<ITasks[]> {
        return this.http.get<ITasks[]>(RestEndpoint.tasks.getAllTasks);
    }

    public deleteTask(taskId: string): Observable<ITasks> {
        return this.http.delete<ITasks>(RestEndpoint.tasks.deleteTask(taskId)).pipe(delay(2000));
    }

    public updateTaskStatus(taskId: string, status: EStatusTasks): Observable<ITasks> {
        return this.http.patch<ITasks>(RestEndpoint.tasks.updateStatusTask(taskId), { status } ).pipe(delay(2000));
    }

    public createTask(task: TTasks): Observable<TTasks> {
        return this.http.post<TTasks>(RestEndpoint.tasks.createTasks, task).pipe(delay(2000));
    }

    public getTaskById(taskId: string): Observable<TTasks> {
        return this.http.get<TTasks>(RestEndpoint.tasks.getTaskById(taskId)).pipe(delay(2000));
    }

    public updateTaskById(taskId: string, data: TTasks): Observable<ITasks> {
        return this.http.put<ITasks>(RestEndpoint.tasks.updateTaskById(taskId), data ).pipe(delay(2000));
    }
}