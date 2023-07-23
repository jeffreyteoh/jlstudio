import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title: string = 'jlstudio';
  page_loading: boolean = true;
  show_header: boolean = true;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private metaTagService: Meta
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/dashboard') {
          this.show_header = false;
        } else {
          this.show_header = true;
        }
      }
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit() {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content:
          'JLStudio, John Loong,  Ipoh, Kuala Lumpur, Malaysia, Photographer, Image, Photo',
      },
      {
        name: 'description',
        content:
          '',
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { property: 'og:url', content: `${this.hostUrl}${this.router.url}`},
      // { property: 'og:description', content: metadata.description },
      // { property: 'og:type', content: metadata.type },

    ]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.page_loading = false;
    }, 1000);
  }
}
