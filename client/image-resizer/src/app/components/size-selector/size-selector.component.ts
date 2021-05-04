import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

export interface SizeDataModel {
  height: number;
  width: number;
  ratio: string;
  name: string;
}

@Component({
  selector: 'app-size-selector',
  templateUrl: './size-selector.component.html',
  styleUrls: ['./size-selector.component.scss']
})
export class SizeSelectorComponent implements OnInit {
  sizeData: SizeDataModel[] = [
    {
      height: 1080,
      width: 1920,
      ratio: '9:16',
      name: 'Story'
    },
    {
      height: 1080,
      width: 1080,
      ratio: '1:1',
      name: 'Square'
    },
    {
      height: 1080,
      width: 1350,
      ratio: '4:5',
      name: 'Portrait'
    },
    {
      height: 1080,
      width: 566,
      ratio: '1.91:1',
      name: 'Landscape'
    }
  ];

  sizeForm = new FormControl();
  @Output() change: EventEmitter<SizeDataModel> = new EventEmitter<SizeDataModel>();

  constructor() {
  }

  ngOnInit(): void {
    this.sizeForm.valueChanges.subscribe(res => this.change.emit(res));
  }

}
