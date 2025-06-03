import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-info',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './students-info.component.html',
  styleUrl: './students-info.component.scss'
})
export class StudentsInfoComponent {

}
