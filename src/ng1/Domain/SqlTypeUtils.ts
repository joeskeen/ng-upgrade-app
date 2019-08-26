import * as _ from 'lodash';

// Helper methods to manage SQL types.
//
// Here are two examples of SQL types:
// decimal(32,2)
// 'decimal' is the name, 32 is parameter[0] and 2 is parameter[1]
//
// datetime2
// 'datetime2' is the name, and both parameters usage is 'NONE'
import { SqlTypeDefinition } from './SqlTypeDefinition';
import { ISqlTypeFactory, SqlType } from './SqlType';
import { Configuration } from '../../../src/app/services/config.service';

const dataTypes: SqlTypeDefinition[] = [
  ({ displayName: 'Integer', name: 'int' } as Partial<
    SqlTypeDefinition
  >) as SqlTypeDefinition,
  ({ displayName: 'Integer', name: 'int' } as Partial<
    SqlTypeDefinition
  >) as SqlTypeDefinition,
  ({ displayName: 'Integer', name: 'int' } as Partial<
    SqlTypeDefinition
  >) as SqlTypeDefinition,
  ({ displayName: 'Integer', name: 'int' } as Partial<
    SqlTypeDefinition
  >) as SqlTypeDefinition,
  ({ displayName: 'Integer', name: 'int' } as Partial<
    SqlTypeDefinition
  >) as SqlTypeDefinition,
  ({ displayName: 'Integer', name: 'int' } as Partial<
    SqlTypeDefinition
  >) as SqlTypeDefinition,
  ({ displayName: 'Integer', name: 'int' } as Partial<
    SqlTypeDefinition
  >) as SqlTypeDefinition,
  ({ displayName: 'Integer', name: 'int' } as Partial<
    SqlTypeDefinition
  >) as SqlTypeDefinition,
  ({ displayName: 'Integer', name: 'int' } as Partial<
    SqlTypeDefinition
  >) as SqlTypeDefinition
];

export class SqlTypeUtils {
  public static $inject = ['ServerConfig', 'sqlTypeFactory'];
  constructor(
    private serverConfiguration: Configuration,
    private sqlTypeFactory: ISqlTypeFactory
  ) {}

  public getDefinition(name: string): SqlTypeDefinition {
    for (let i = 0; i < dataTypes.length; i++) {
      const type = dataTypes[i];
      if (type.name === name) {
        return type;
      }
    }
    return null;
  }

  public getDefinitionByDisplayName(name: string): SqlTypeDefinition {
    for (let i = 0; i < dataTypes.length; i++) {
      const type = dataTypes[i];
      if (type.displayName === name) {
        return type;
      }
    }
    return null;
  }

  public createDataType(name: string): SqlType {
    const definition = this.getDefinition(name);
    return this.sqlTypeFactory.create(definition);
  }

  public createDataTypeByDisplayName(displayName: string): SqlType {
    const definition = this.getDefinitionByDisplayName(displayName);
    return this.sqlTypeFactory.create(definition);
  }

  public getAllTypes(): Array<SqlType> {
    const allTypes = dataTypes.map(definition => {
      return this.sqlTypeFactory.create(definition);
    });
    return allTypes;
  }

  public getAllTypeDisplayNames(): Array<string> {
    const allTypes = _.filter(
      dataTypes,
      (datatype: SqlTypeDefinition) => datatype.clientSupported
    ).map(definition => {
      return definition.displayName;
    });
    return allTypes;
  }

  private addMaxLength(sqlTypeName: string, defaultMaxLength): number {
    let maxLength: number;
    const bitMaxLength = 1;
    const intMaxLength = 11; // Int max range 2,147,483,647 https://msdn.microsoft.com/en-us/library/ms187745.aspx
    const dateMaxLength = 10; // https://msdn.microsoft.com/en-us/library/ms186724.aspx
    const timeMaxLength = 16; // https://msdn.microsoft.com/en-us/library/ms186724.aspx
    const datetime2MaxLength = 27; // https://msdn.microsoft.com/en-us/library/bb677335.aspx

    switch (sqlTypeName) {
      case 'bit':
        maxLength = bitMaxLength;
        break;
      case 'integer':
        maxLength = intMaxLength;
        break;
      case 'date':
        maxLength = dateMaxLength;
        break;
      case 'time':
        maxLength = timeMaxLength;
        break;
      case 'datetime2':
        maxLength = datetime2MaxLength;
        break;
      default:
        maxLength = defaultMaxLength;
        break;
    }

    return maxLength;
  }

  public canConvertSqlTypes(fromSqlType: SqlType, toSqlType: SqlType): boolean {
    const fromName = fromSqlType.name;
    const toName = toSqlType.name;
    let fromMaxLength = parseInt(fromSqlType.parameters[0].toString(), 10);
    let toMaxLength = parseInt(toSqlType.parameters[0].toString(), 10);

    fromMaxLength = this.addMaxLength(fromName, fromMaxLength);
    toMaxLength = this.addMaxLength(toName, toMaxLength);

    return (
      fromMaxLength <= toMaxLength &&
      (fromName === toName ||
        toName === 'nvarchar' ||
        (fromName === 'date' && toName === 'datetime2') ||
        (fromName === 'integer' && toName === 'decimal'))
    );
  }
}
