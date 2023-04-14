import { Component, Input } from '@angular/core';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import { Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2'
import { ApiResponse } from 'src/app/models/apiResponse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showAddList: boolean = false;
  lists: List[] = [];
  @Output() listSelect = new EventEmitter<List>();
  @Input() activeList?: List;

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.loadLists();
  }


  public selectList(list: List): void {
    this.listSelect.emit(list);
  }

  public addList(): void {
    Swal.fire({
      title: 'Add new list',
      text: 'Enter the name of your new list',
      confirmButtonText: 'Add',
      showCancelButton: true,
      confirmButtonColor: '#0891b2',
      cancelButtonColor: '#64748b',
      input: 'text'
    }).then((result) => {
      if (result.isConfirmed) {
        let name = result.value;
        var list: List = {
          name: name
        }

        this.listService.AddList(list).subscribe(() => {
          this.loadLists();
        });

        this.selectList(list);
      }
    })
  }

  public deleteList(list: List): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0891b2',
      cancelButtonColor: '#64748b',
      iconColor: '#0891b2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listService.DeleteList(list).subscribe(() => {
          this.loadLists();
        })
        this.selectList(this.lists[0]);
      }
    })
  }

  private loadLists(): void{
    this.listService.GetLists().subscribe((data:ApiResponse) => {
      this.lists = data.result;
    });
  }
}
