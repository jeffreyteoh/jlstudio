import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})


export class ContactComponent {
  dataList = [
    {
      id: 1,
      name: 'John Doe',
      age: 20,
      income: 1000
    },
    {
      id: 2,
      name: 'James Foo',
      age: 25,
      income: 3500
    }
  ];
  searchText: string = '';
  filteredDataList: any[] = [];

  applyFilter() {
    if (this.searchText.trim() === '') {
      this.filteredDataList = this.dataList;
    } else {
      this.filteredDataList = this.dataList.filter(
        data => data.name.toLowerCase().includes(this.searchText.toLowerCase())
      );

      console.log(this.filteredDataList);
    }
  }
}
