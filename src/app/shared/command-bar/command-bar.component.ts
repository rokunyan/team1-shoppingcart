import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrl: './command-bar.component.css'
})
export class CommandBarComponent {
  @Input() commands: {label: string, action: () => void}[] = [];
  @Output() commandClicked = new EventEmitter<string>();

  onCommandClick(command: {label: string, action: () => void}) {
    command.action();
    this.commandClicked.emit(command.label);
  }

  getButtonClass(command: any): string {
    switch (command.type) {
      case 'primary': return ' btn btn-primary';
      case 'secondary': return 'btn btn-secondary';
      case 'danger': return 'btn btn-danger';
      default: return 'btn btn-default';
    }
  }
}
