import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CreatePostComponent } from './shared/components/create-post/create-post.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CreatePostComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'MyApp';
}
