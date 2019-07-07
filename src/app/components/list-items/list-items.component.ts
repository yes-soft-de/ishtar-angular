import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../../User.model";
import { DataService } from "../../data.service";

@Component({
  selector: "app-list-items",
  templateUrl: "./list-items.component.html",
  styleUrls: ["./list-items.component.sass"]
})
export class ListItemsComponent implements OnInit {
  inputValue = "all";
  items = User;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // @ts-ignore
    return this.dataService.getConfig().subscribe(data => (this.items = data));
  }
}
