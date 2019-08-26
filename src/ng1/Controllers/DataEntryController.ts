import { Field, IFieldFactory } from '../Domain/Field';
import { IFieldMappingModel } from '../Domain/MappingModel';
import { types } from '../Domain/SqlType';

export class DataEntryController {
  private readonly fields: IField[] = [];
  model: any = {};
  result: any;

  static $inject = ['fieldFactory'];
  constructor(fieldFactory: IFieldFactory) {
    this.fields = [
      { fieldDefinition: fieldFactory.create('Name', types.varchar) },
      { fieldDefinition: fieldFactory.create('Count', types.int) },
      { fieldDefinition: fieldFactory.create('Confirm', types.bit) },
      { fieldDefinition: fieldFactory.create('Date', types.date) }
    ];
  }

  getFields() {
    return this.fields;
  }

  submit() {
    this.result = { ...this.model };
  }
}

interface IField {
  fieldDefinition: Field;
  mappings?: IFieldMappingModel[];
}
