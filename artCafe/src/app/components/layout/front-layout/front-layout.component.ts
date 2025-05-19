import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutComponent } from "../layout/layout.component";
import { FooterComponent } from "../footer/footer.component";



@Component({
  selector: 'app-front-layout',
  standalone: true, // Required for Angular 14+ standalone component feature
  imports: [CommonModule,
    FormsModule,
    NgbDropdownModule, RouterOutlet, LayoutComponent, FooterComponent], // Correctly imported Angular modules
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.css'] // Corrected styleUrls
})



export class FrontLayoutComponent  {



}