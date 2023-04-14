import { Component, Input } from '@angular/core';
import { ApiResponse } from 'src/app/models/apiResponse';
import { List } from 'src/app/models/list';
import { Task } from 'src/app/models/task';
import { Task_U_C_DTO } from 'src/app/models/task_U_C_DTO';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input() list?: List;
  tasks?: Task[] = [];
  showDetails = false;
  selectedTask: Task = {
    id: 1,
    name: '',
    isCompleted: false
  };
  newTaskName: any = '';

  constructor(private taskService: TaskService) {}

  ngOnChanges(): void{
    this.loadTasks();
  }

  public toggleDetails(task: Task): void{
    this.selectedTask = task;
    this.showDetails = !this.showDetails;
  }

  public completeTask(task: Task): void{
    this.showDetails = false;
    task.isCompleted = !task.isCompleted;
    this.updateTask(task);

  }

  public updateTask(task: Task): void {
    var taskUpdateDto:Task_U_C_DTO = {
      id: task.id,
      name: task.name,
      description: task.description,
      isCompleted: task.isCompleted,
      dueDate: task.dueDate,
      listId: this.list?.id
    };
    this.taskService.UpdateTask(taskUpdateDto).subscribe();
    this.showDetails = false;
  }

  private loadTasks(): void{
    this.taskService.loadTasksForList(this.list?.id).subscribe((data:ApiResponse) => {
      this.tasks = data.result;
    });
  }

  public addTask(name: string): void {
    console.log(name);
    var task: Task_U_C_DTO = {
      name: name,
      id: 1,
      listId: this.list?.id,
      isCompleted: false
    }

    this.taskService.AddTask(task).subscribe((result:ApiResponse) => {
      this.loadTasks()
    });
    this.newTaskName = '';
  }

  public deleteTask(task: Task): void {
    this.taskService.DeleteTask(task).subscribe(() => {
      this.loadTasks();
    });
    this.showDetails = false;
  }

}
