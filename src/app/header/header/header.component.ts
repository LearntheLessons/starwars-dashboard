import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {
  @Input() showBackButton = false;

  goBack() {
    window.history.back();
  }
}
