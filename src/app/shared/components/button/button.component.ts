import { Component, EventEmitter, Input, Output } from '@angular/core';

const getStyles = (...args: string[]) => ["button", ...args].filter(Boolean)


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label!: string; 
  @Input() routerLink!: string;
  @Input() primary = false;
  @Input() type: 'primary' | 'secondary' |  'gradient'  |  'info' |  'danger' |  'warning'  |  'success'= 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'small'
  @Input() iconName?: string;
  @Input() iconPosition: 'start' | 'end' = 'end';
  @Output() onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    return getStyles(this.type, this.size);   
  }

}
