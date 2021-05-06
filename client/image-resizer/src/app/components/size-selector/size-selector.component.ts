import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

export interface SizeDataModel {
  height: number;
  width: number;
  ratio: string;
  name: string;
  divider: number;
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
      name: 'Story',
      divider: 33
    },
    {
      height: 1080,
      width: 1080,
      ratio: '1:1',
      name: 'Square',
      divider: 20
    },
    {
      height: 1080,
      width: 1350,
      ratio: '4:5',
      name: 'Portrait',
      divider: 25
    },
    {
      height: 1080,
      width: 566,
      ratio: '1.91:1',
      name: 'Landscape',
      divider: 15
    }
  ];

  sizeForm = new FormControl();
  @Output() select: EventEmitter<SizeDataModel> = new EventEmitter<SizeDataModel>();

  constructor() {
  }

  ngOnInit(): void {
    this.sizeForm.valueChanges.subscribe(res => this.select.emit(res));
  }

}
