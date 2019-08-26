import { Collection } from './Collection';
import { dataTypes } from './SqlDataTypes';
import { SqlNumberDefinition } from './SqlNumberDefinition';

export interface ISqlTypeDefinitionFactory {
  create(name: string): SqlTypeDefinition;
}

// This contains information needed to construct a type.
// For example, to construct a decimal(32,2),
// we need to know the range of the first and
// second numbers, the name, whether the first and
// second numbers are required, and good initial values
// if they are.
//
// The SqlTypeDefinition for each supported type is loaded
// from the server -- no definitions are actually created
// on the client-side.
export class SqlTypeDefinition {
  public static scheme = {
    name: String,
    displayName: String,
    description: String,
    parameters: new Collection(SqlNumberDefinition),
    compatibleConversions: new Collection(String)
  };
  name: string;
  displayName: string;
  parameters: Array<SqlNumberDefinition>;
  description: string;
  clientSupported: boolean;
  compatibleConversions: Array<string> = [];

  public static fromObject(obj: Partial<SqlTypeDefinition>) {
    return Object.assign(new SqlTypeDefinition(), obj);
  }

  public static getFactory(): ISqlTypeDefinitionFactory {
    return {
      create: () => {
        return new SqlTypeDefinition();
      }
    };
  }

  getParameter(index: number): SqlNumberDefinition {
    if (index < 0 || index > 1) {
      throw Error('No number found for index ' + index);
    }
    return this.parameters[index];
  }

  getMinimum(index: number): number {
    return this.getParameter(index).minimum;
  }

  getMaximum(index: number): number {
    return this.getParameter(index).maximum;
  }

  areBothRequiredOrOptional(): boolean {
    return (
      this.getParameter(0).isRequiredOrOptional() &&
      this.getParameter(1).isRequiredOrOptional()
    );
  }

  isParameterRequiredOrOptional(index: number) {
    return this.getParameter(index).isRequiredOrOptional();
  }

  isParameterRequired(index: number) {
    return this.getParameter(index).isRequired();
  }

  isParameterOptional(index: number) {
    return this.getParameter(index).isOptional();
  }

  isParameterValid(index: number, val: number) {
    // If not required, say it's valid
    if (!this.getParameter(index).isRequiredOrOptional()) {
      return true;
    }

    if (this.getParameter(index).isInRange(val)) {
      return false;
    }

    // Special check for the second number
    if (index === 1) {
      return val <= this.getParameter(0).maximum;
    }

    return true;
  }
}

export const typeDefinitions: {
  [name: string]: SqlTypeDefinition;
} = dataTypes.reduce((prev, curr) => {
  prev[curr.name] = SqlTypeDefinition.fromObject(curr as any);
  return prev;
}, {});
