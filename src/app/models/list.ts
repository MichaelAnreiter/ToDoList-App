import { Task } from './task';

export class List {
  public id?: Number;
  public name: string = "";
  public listItems?: Array<Task>;
}
