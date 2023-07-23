import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Breadcrumb } from '../../models/breadcrumb.model';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent  {
  constructor(private route: ActivatedRoute) {}
  breadcrumbs: Breadcrumb[] = [];
  title: string = '';

  ngOnInit() {
    this.breadcrumbs.push(
      {
        label: 'Home',
        url: '/'
      },
    );

    if (this.route.snapshot.routeConfig?.data?.breadcrumb) {
      this.title = this.route.snapshot.routeConfig.data.breadcrumb.label;
    }
  }

}
