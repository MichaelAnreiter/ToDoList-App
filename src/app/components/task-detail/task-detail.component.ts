import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  @Input() task: Task = {
    id: 1,
    name: '',
    isCompleted: false
  };
  titleChanging = false;
  descriptionChanging = false;
  @Output() updateTask = new EventEmitter<Task>();
  @Output() closeDetails = new EventEmitter<boolean>();
  @Output() deleteTask = new EventEmitter<Task>();
  newDescription?= '';
  newTitle = '';

  ngOnInit(): void {
    this.newDescription = this.task.description;
    this.newTitle = this.task.name;
  }

  public changeTitle(): void {
    if (this.descriptionChanging == true)
      this.descriptionChanging = false;
    this.titleChanging = true;
  }

  public changeDescription(): void {
    if (this.titleChanging)
      this.titleChanging = false
    this.descriptionChanging = true;
  }

  public toggleDetails(): void {
    this.closeDetails.emit();
  }
  public savedChanges(): void {
    this.task.description = this.newDescription;
    this.task.name = this.newTitle;
    this.updateTask.emit(this.task);
  }
  public confirmDelete(task: Task): void {
    this.deleteTask.emit(task);
  }
}
