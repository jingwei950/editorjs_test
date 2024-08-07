import { ChangeDetectionStrategy, Component } from '@angular/core';

// Angular material
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';

// Components
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'App-create-post',
  standalone: true,
  templateUrl: './create-post.component.html',
  imports: [EditorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent {
  constructor(public dialog: Dialog) {}

  openDialog() {
    this.dialog.open<string>(EditorComponent, {
      width: '500px',
      height: 'auto',
      minHeight: '500px',
      maxHeight: '800px',
    });
  }
}
