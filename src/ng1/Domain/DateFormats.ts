export class DateFormats {
  public dateFormat: string = 'M/D/YYYY';
  public dateFormat2: string = 'M/d/yyyy';
  public timeFormat: string = 'h:mm A';
  public timeFormat2: string = 'h:mm a';

  public getFormatByDataType(
    typeName: string,
    alternateFormat: boolean = false
  ) {
    switch (typeName) {
      case 'date':
        return alternateFormat ? this.dateFormat2 : this.dateFormat;
      case 'time':
        return alternateFormat ? this.timeFormat2 : this.timeFormat;
      case 'datetime2':
        return alternateFormat
          ? this.dateFormat2 + ' ' + this.timeFormat2
          : this.dateFormat + ' ' + this.timeFormat;
      default:
        throw new Error('Not yet handling date type:  ' + typeName);
    }
  }
}
