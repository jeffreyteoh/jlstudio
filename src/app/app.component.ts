import { AfterViewInit, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterViewInit {
  title = 'jlstudio';
  page_loading = true;

  constructor(private modalService: NgbModal) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.page_loading = false;
    }, 1000);
  }
}
