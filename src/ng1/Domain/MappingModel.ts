export interface IFieldMappingModel {
  id?: number;
  lookupListColumnName?: string;
  applicationColumnName?: string;
  lookupListColumnUniqueId?: string;
  applicationColumnUniqueId?: string;
  allowCustomInput: boolean;
}

export class MappingModel {
  constructor(
    public mappingId: number = 0,
    public lookupListId: number = 0,
    public lookupListName: string = '',
    public applicationTableId: number = 0,
    public applicationTableName: string = '',
    public isSystem: boolean = false,
    public fieldMappings: Array<IFieldMappingModel> = [],
    public mainRecordId?: number,
    public canBeDropDown?: boolean
  ) {
    if (!this.canBeDropDown) {
      this.canBeDropDown = false;
    }
  }

  public static copy(map: MappingModel) {
    return new MappingModel(
      map.mappingId,
      map.lookupListId,
      map.lookupListName,
      map.applicationTableId,
      map.applicationTableName,
      map.isSystem,
      map.fieldMappings,
      map.mainRecordId,
      map.canBeDropDown
    );
  }

  // Factory method
  public static create(
    mappingId?: number,
    lookupListId?: number,
    lookupListName?: string,
    applicationTableId?: number,
    applicationTableName?: string,
    isSystem?: boolean,
    fieldMappings?: Array<IFieldMappingModel>,
    mainRecordId?: number,
    canBeDropDown?: boolean
  ): MappingModel {
    return new MappingModel(
      mappingId,
      lookupListId,
      lookupListName,
      applicationTableId,
      applicationTableName,
      isSystem,
      fieldMappings,
      mainRecordId,
      canBeDropDown
    );
  }

  public isDropDownList(): boolean {
    return this.fieldMappings.length === 1 && this.canBeDropDown;
  }
}
