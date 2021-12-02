import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/users/models/user.model';

@Component({
  selector: 'eei-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() user!: User;
}
