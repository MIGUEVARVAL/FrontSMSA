import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  @Input() isSuccess: boolean = false;
  @Input() successMessage: string = "";
  @Input() isError: boolean = false;
  @Input() errorMessage: string = "";

  public showMessage(type: 'success' | 'error', message: string): void {
    if (type === 'success') {
      this.isSuccess = true;
      this.successMessage = message;
      this.isError = false;
    } else {
      this.isError = true;
      this.errorMessage = message;
      this.isSuccess = false;
    }
    setTimeout(() => {
      this.isSuccess = false;
      this.successMessage = "";
      this.isError = false;
      this.errorMessage = "";
    }, 10000);
  }

  public clearMessages(): void {
    this.isSuccess = false;
    this.successMessage = "";
    this.isError = false;
    this.errorMessage = "";
  }
}