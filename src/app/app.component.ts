import { Component } from '@angular/core';
import { List } from './models/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoList-App';
  currentList?: List;


  public selectNewList(list: List): void {
    this.currentList = list;
  }
}
