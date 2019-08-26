import { SqlTypeDefinition, typeDefinitions } from './SqlTypeDefinition';
import { Collection } from './Collection';

export interface ISqlTypeFactory {
  create(definition: SqlTypeDefinition);
}

//
// This is the type of a SQL column. It has three parts:
// name, e.g. "int" or "decimal"
// parameters[0], e.g. the 32 in decimal(32,2)
// parameters[1], e.g. the 2 in decimal(32,2)
export class SqlType {
  constructor(definition: SqlTypeDefinition) {
    if (definition) {
      this.name = definition.name;
      this.parameters = definition.parameters.map(parameter =>
        parameter.initial.toString()
      );
      this.displayName = definition.displayName;
      this.compatibleConversions = definition.compatibleConversions;
    }
  }

  public static scheme = {
    name: String,
    displayName: String,
    parameters: new Collection(String),
    compatibleConversions: new Collection(String)
  };
  name: string;
  displayName: string;
  parameters: Array<string>;
  compatibleConversions: Array<string>;

  public static getFactory(): ISqlTypeFactory {
    return {
      create: (definition: SqlTypeDefinition) => {
        return new SqlType(definition);
      }
    };
  }
}

export const types: {
  [name: string]: SqlType;
} = Object.keys(typeDefinitions).reduce((prev, curr) => {
  prev[curr] = new SqlType(typeDefinitions[curr]);
  return prev;
}, {});
