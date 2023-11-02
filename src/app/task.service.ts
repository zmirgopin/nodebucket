import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { COOKIE_KEYS, attachBaseUrl } from './pages/sign-in/sign-in.component';
import { CookieService } from 'ngx-cookie-service';
import { ErrorService } from './error.service';

export interface Employee {
  empId: number;
  name: string;
  tasks?: Omit<Task, 'Employee'>;
}

export interface Task {
  description: string;
  done: boolean;
  employee: Omit<Employee, 'Task'>;
  _id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(null as any as Task[]);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private errorService: ErrorService
  ) {
    this.loadTasks();
  }

  taskBaseUrl(empId = parseInt(this.cookieService.get(COOKIE_KEYS.EMP_ID))) {
    return attachBaseUrl(`api/employees/${empId}/tasks`);
  }

  public loadTasks(empId?: number) {
    console.log('loadTasks.fired');
    this.http.get<Task[]>(this.taskBaseUrl(empId)).subscribe({
      next: (tasks) => this.tasks$.next(tasks),
      error: this.errorService.handleError,
    });
  }

  public addTask(task: Task) {
    return this.http.post(this.taskBaseUrl(), { task }).subscribe({
      next: () => this.loadTasks(),
      error: this.errorService.handleError,
    });
  }

  public deleteTask(task: Task) {
    return this.http.delete(this.taskBaseUrl() + `/${task._id}`).subscribe({
      next: () => this.loadTasks(),
      error: this.errorService.handleError,
    });
  }

  public checkOff(task: Task) {
    return this.editTask(task);
  }

  public editTask(task: Task) {
    return this.http
      .put(this.taskBaseUrl() + `/${task._id}`, { task })
      .subscribe({
        next: () => this.loadTasks(),
        error: this.errorService.handleError,
      });
  }
}
