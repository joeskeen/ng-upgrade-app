import * as angular from 'angular';
import * as _ from 'lodash';

import { SqlType } from './SqlType';
import { DateFormats } from './DateFormats';

export interface IFieldFactory {
  create(name: string, type: SqlType): Field;
}
export interface ISelectOption {
  value: string;
  text: string;
  hidden: boolean;
  locked: boolean;
}

export class Field {
  constructor(name: string, public dataType: SqlType) {
    this.id = 0;
    this.name = name;
    this.uniqueId = _.uniqueId('field');
    this.isNew = false;

    this.fieldNameMatches = false;
    this.refreshOptions = index => {
      if (this.refreshOptionsCallback) {
        this.options = this.refreshOptionsCallback(index);
      }
    };
    this.mapped = false;
    this.dateFormats = new DateFormats();
  }

  // Scheme for runtime json parsing
  public static scheme = {
    id: Number,
    name: String,
    tableId: Number,
    dataType: SqlType,
    primaryKey: Boolean,
    isRequired: Boolean,
    isUniqueKey: Boolean,
    displayLabel: String,
    defaultValue: String,
    helpText: String,
    ordinal: Number,
    isForeignKey: Boolean
  };
  id: number;
  name: string;
  primaryKey: boolean;
  isRequired: boolean;
  isUniqueKey: boolean;
  isForeignKey: boolean;
  displayLabel: string;
  defaultValue: string;
  helpText: string;
  ordinal: number;
  isNew: boolean;
  options: ISelectOption[];
  refreshOptionsCallback: (index: number) => ISelectOption[];
  refreshOptions: (index: number) => void;

  dataTypeDisplayName: string;
  uniqueId: string;
  mapped: boolean;

  private dateFormats: DateFormats;

  private fieldNameMatches: boolean;

  public static getFactory(): IFieldFactory {
    return {
      create: (name: string, type: SqlType) => {
        return new Field(name, type);
      }
    };
  }

  public format() {
    if (this.dataType.name === 'date' || this.dataType.name === 'datetime2') {
      return (
        "| date: '" +
        this.dateFormats.getFormatByDataType(this.dataType.name, true) +
        "'"
      );
    } else if (this.dataType.name === 'time') {
      return (
        "| stringToTime | date: '" +
        this.dateFormats.getFormatByDataType(this.dataType.name, true) +
        "'"
      );
    }
    return null;
  }

  public addCustomInput($select: any) {
    const search = $select.search;
    let list = angular.copy($select.items);
    const flag = -1;

    list = list.filter(item => item.id !== flag);

    if (search === '') {
      $select.items = list;
    } else {
      const userInputItem = {
        id: flag,
        hidden: false,
        locked: false,
        value: search,
        text: search
      };
      for (let i = $select.items.length - 1; i >= 0; i--) {
        if ($select.items[i].id === flag) {
          $select.items.splice(i, 1);
        }
      }
      $select.items.push(userInputItem);
      $select.selected = $select.items[$select.items.length - 1];
    }
  }

  getName(): string {
    return this.name;
  }

  // Get the name for a field.
  // Example: table1022_field25_dataType of <input type="text" name="table1022_field25_dataType"/>
  fieldName(suffix: string): string {
    return this.uniqueId + '_' + suffix;
  }

  isValid(): boolean {
    return true;
  }

  detectNames(): void {
    const validDbName = getValidDatabaseName(this.displayLabel);
    this.fieldNameMatches = validDbName === this.name;
  }

  updateRelatedNames(syncNames: boolean = true): void {
    const validDbName = getValidDatabaseName(this.displayLabel);
    if (this.fieldNameMatches && syncNames) {
      this.name = validDbName;
    }
  }
}

function getValidDatabaseName(name: string): string {
  if (!name) {
    return '';
  }

  // This regex will match on single characters that are not letters, digits, or an underscore
  const removeSpecialChars = /[^a-zA-Z0-9\d_]/gi;
  const cleaned = name.replace(removeSpecialChars, '');
  return cleaned;
}
