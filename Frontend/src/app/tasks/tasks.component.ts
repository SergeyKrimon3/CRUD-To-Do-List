import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MatTableDataSource } from '@angular/material/table';
import { ITasks, TTaskStatus } from '../shared/models/tasks.model';
import { TasksService } from '../shared/services/tasks.service';
import { EStatusTasks } from '../shared/enums/status.enum';
import { dateInISOString, formatDateWithAbbreviatedMonth, maxDateFilter } from '../shared/services/date-converter.service';
import { LanguageService } from '../shared/services/language.service';
import { ConfirmModalComponent } from '../shared/modals/confirm-modal/confirm-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScreenInitDataOptions } from '../shared/models/init-data-options.model';
import { BackToTopButtonComponent } from '../shared/components/back-to-top-button/back-to-top-button.component';
import { PixelsNumbersScrolledPage } from '../shared/services/pixels-numbers-scrolled-page.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tasks',
	imports: [
		CommonModule,
		SharedModule,
		HeaderComponent,
		BackToTopButtonComponent
	],
	templateUrl: './tasks.component.html',
	styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

	public allTasks: Array<ITasks> = [];
    public dataSource: MatTableDataSource<ITasks> = new MatTableDataSource(this.allTasks);
    public displayedColumns: Array<string> = ['tasks'];
	public loading: boolean = false;
	public loadingRequest: boolean = false;
	public eStatusTask: typeof EStatusTasks = EStatusTasks;
	public selectedTaskStatus: string = '';
	public taskFilter: string = '';
	public taskStatusList: Array<EStatusTasks> = [
		EStatusTasks.ALL,
		EStatusTasks.PENDING,
		EStatusTasks.FINISHED
	];
	public selectedDate: Date | null = null;

	constructor(
		private readonly tasksService: TasksService,
		private readonly languageService: LanguageService,
		private readonly dialog: MatDialog,
		public pixelsNumbersScrolledPage: PixelsNumbersScrolledPage,
		private readonly router: Router
	) {}

	public ngOnInit(): void {
		this.loadTasks({ isInitialLoad: true });
	}

	public loadTasks(optionsToInit: ScreenInitDataOptions): void {
		const isInitialLoad: boolean = optionsToInit?.isInitialLoad || false;

		if (isInitialLoad) {
            this.loading = true;
        } else {
			this.loadingRequest = true;
		}

		this.tasksService.getAllTasks().subscribe({
			next: (taskList) => {
			this.allTasks = taskList.sort((a, b) => {
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			});
			this.dataSource.data = this.allTasks;
		}
		}).add(() => {
			this.loading = false;
			this.loadingRequest = false;
		});
	}

	public getTaskStatusColor(status: EStatusTasks): string {
        if (!status) {
            return '';
        } else if (status === EStatusTasks.FINISHED) {
            return 'primary-green-700';
        } else {
			return 'primary-yellow-400';
		}
    }

	public translateTaskStatusList(status: EStatusTasks): string {
        if (!status) {
            return '';
        } else if (status === EStatusTasks.FINISHED) {
            return 'tasks.finished';
        } else if (status === EStatusTasks.PENDING) {
            return 'tasks.pending';
		} else {
			return 'tasks.all';
		}
    }

	public formatDateWithAbbreviatedMonth(date: string): string {
        return formatDateWithAbbreviatedMonth(dateInISOString(date), undefined, undefined, this.languageService);
    }

	public openConfirmModal(taskId: string): void {
        const dialogRef: MatDialogRef<ConfirmModalComponent> = this.dialog.open(ConfirmModalComponent, {
            data: {
                title: 'tasks.title.delete',
                text: 'tasks.subtitle',
                declineOption: 'button.cancel',
                confirmOption: 'button.delete'
            }
        });

        dialogRef.afterClosed().subscribe((action: boolean) => {
			if (action) {
				this.deleteTask(taskId);
			}
        });
    }

	public deleteTask(taskId: string): void {
		this.loadingRequest = true;
		this.tasksService.deleteTask(taskId).subscribe({
			next: () => {
				this.loadTasks({ isInitialLoad: false });
			},
			complete: () => {
				this.loadingRequest = false;
			},
			error: () => {
				this.loadingRequest = false;
			}
		});
	}

	public updateTaskStatus(taskId: string, status: EStatusTasks): void {
		this.loadingRequest = true;
		const data: TTaskStatus = {
			status: status
		};
		this.tasksService.updateTaskStatus(taskId, data).subscribe({
			next: () => {
				this.loadTasks({ isInitialLoad: false });
			},
			complete: () => {
				this.loadingRequest = false;
			},
			error: () => {
				this.loadingRequest = false;
			}
		});
	}

	public clearFilters(): void {
        this.selectedTaskStatus = '';
        this.taskFilter = '';
		this.selectedDate = null;
		this.dataSource.data = this.allTasks;
    }

	public searchTask(): void {
		this.dataSource.data = this.allTasks.filter(task => {
			const hasSelectedStatus: boolean | string = this.selectedTaskStatus && this.selectedTaskStatus !== EStatusTasks.ALL;
			const matchesStatus: boolean = hasSelectedStatus ? task.status === this.selectedTaskStatus : true;
			const matchesDate: boolean = this.selectedDate ? this.isSameDateUTC(new Date(task.createdAt), this.selectedDate) : true;
			const filter: string = this.taskFilter?.trim().toLowerCase() || '';
			const matchesSearch: boolean = filter ? task.id.toLowerCase() === filter || task.title.toLowerCase().includes(filter) : true;

			return matchesStatus && matchesDate && matchesSearch;
		});
	}

	private isSameDateUTC(date1: Date, date2: Date): boolean {
		const d1: Date = new Date(Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate()));
		const d2: Date = new Date(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()));
		return d1.getTime() === d2.getTime();
	}

	public maxDate(date: Date | null): boolean {
		return maxDateFilter(date);
	}

	public goToEditTask(taskId: string): void {
		this.router.navigate([`/tasks/edit/${taskId}`]);
	}

	public goToViewTask(taskId: string): void {
		this.router.navigate([`/tasks/view/${taskId}`]);
	}

	public goToCreateTask(): void {
		this.router.navigate(["/tasks/create"]);
	}
}