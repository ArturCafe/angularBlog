import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminLayoutComponent } from './admin/components/layout/admin-layout/admin-layout.component';





@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminLayoutComponent, ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularcourse';

  
}
