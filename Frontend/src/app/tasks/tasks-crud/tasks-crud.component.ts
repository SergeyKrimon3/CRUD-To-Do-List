import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { showErrorForInputs } from '../../shared/validators/form-group.validator';
import { TasksService } from '../../shared/services/tasks.service';
import { TTasks } from '../../shared/models/tasks.model';
import { EStatusTasks } from '../../shared/enums/status.enum';
import { EMode } from '../../shared/enums/mode.enum';
import { CustomSnackbarComponent } from '../../shared/components/custom-snackbar/custom-snackbar.component';
import { TranslationConstants } from '../../shared/services/translation.service';
import { SnackBarTheme } from '../../shared/models/snackbar.model';

@Component({
    selector: 'app-tasks-crud',
    imports: [
        CommonModule,
        SharedModule,
        HeaderComponent
    ],
    templateUrl: './tasks-crud.component.html',
    styleUrl: './tasks-crud.component.scss'
})
export class TasksCrudComponent implements OnInit {

    public loading: boolean = false;
    public mode: string = 'create';
    public taskForm: FormGroup<ITaskForm> = new FormGroup<ITaskForm>({
        title: new FormControl('', { validators: [Validators.required] }),
        description: new FormControl('', { validators: [Validators.required] }),
    });
    public today: string = new Date().toISOString();
    public taskId: string = '';
    public eMode: typeof EMode = EMode;
    public createdAtTask: string = '';

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly tasksService: TasksService,
        private readonly customSnackbar: CustomSnackbarComponent,
        private readonly translationConstants: TranslationConstants,
    ) {}

    public ngOnInit(): void {
        this.getExtractedUrlParams();
        this.initData();
    }

    public initData(): void {
        if (this.taskId || this.mode !== this.eMode.CREATE) {
            this.loading = true;
            this.taskForm.disable();
            this.tasksService.getTaskById(this.taskId).subscribe({
                next: (taskList) => {
                    console.log({taskList: taskList});
                    this.createdAtTask = taskList.createdAt;
                    this.mountTaskForm(taskList);
                    this.taskForm.enable();
                },
                error: () => {
                    this.loading = false;
                },
                complete: () => {
                    this.loading = false;
                },
            });
        }
    }

    public mountTaskForm(task: TTasks): void {
        this.taskForm.patchValue({
            title: task?.title,
            description: task?.description
        });
    }

    public getExtractedUrlParams(): void {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.mode = params.get("mode") as string;
            this.taskId = params.get("id") as string;
        });
    }

    public backPage(): void {
        this.location.back();
    }

    public showError(formName: string, form: FormGroup): boolean {
        return showErrorForInputs(formName, form);
    }

    public createTask(): void {
        this.loading = true;
        const data: TTasks = {
            title: this.taskForm.value.title as string,
            description: this.taskForm.value.description as string,
            status: EStatusTasks.PENDING,
            createdAt: this.mode === this.eMode.CREATE ? this.today : this.createdAtTask
        }

        if (this.mode === this.eMode.CREATE) {
            this.tasksService.createTask(data).subscribe({
                next: () => {
                    this.customSnackbar.open(this.translationConstants.translate('tasks.crud.create.snackbar.success'), SnackBarTheme.success, 3000);
                    this.backPage();
                },
                complete: () => {
                    this.loading = false;
                },
                error: () => {
                    this.customSnackbar.open(this.translationConstants.translate('snackbar.default.error'), SnackBarTheme.error, 3000);
                    this.loading = false;
                },
            });
        } else {
            this.tasksService.updateTaskById(this.taskId, data).subscribe({
                next: () => {
                    this.customSnackbar.open(this.translationConstants.translate('tasks.crud.edited.snackbar.success'), SnackBarTheme.success, 3000);
                    this.backPage();
                },
                complete: () => {
                    this.loading = false;
                },
                error: () => {
                    this.customSnackbar.open(this.translationConstants.translate('snackbar.default.error'), SnackBarTheme.error, 3000);
                    this.loading = false;
                },
            });
        }
    }
}

interface ITaskForm {
    title: FormControl<string | null>;
    description: FormControl<string | null>;
}