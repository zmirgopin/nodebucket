import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  todosList!: Task[] | null; // private list of tasks for this component
  doneList!: Task[] | null;
  form: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    // subscribe to task service so that we automatically get new tasks when they are update (deleted,update,created)
    taskService.tasks$.subscribe((tasks) => {
      if (!tasks) {
        return;
      }
      this.todosList = tasks.filter((task) => task.done === false);
      this.doneList = tasks.filter((task) => task.done === true);
    });

    taskService.loadTasks();

    this.form = this.fb.group({
      description: ['', [Validators.required, Validators.min(3)]],
    });
  }

  refresh() {
    this.taskService.loadTasks();
  }

  addTask(task: Task) {
    this.taskService.addTask(task);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }

  checkOff(task: Task, done = !task.done) {
    this.taskService.checkOff({ ...task, done });
  }

  editTask(task: Task) {
    this.taskService.editTask(task);
  }
}
