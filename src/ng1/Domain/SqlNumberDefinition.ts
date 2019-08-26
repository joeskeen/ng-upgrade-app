export interface ISqlNumberDefinitionFactory {
  create(
    usage: string,
    mininum: number,
    maximum: number,
    initial: number
  ): SqlNumberDefinition;
}

// This contains information on a numeric value in
// a SQL type.
//
// For example, the type decimal(32,2) has
// two SQL number definitions, one for the first number
// (currently 32), and one for the second number (
// (currently 2).
//
// This class describes:
//    usage: required, optional or none
//    minimum: minimum allowed value
//    maximum: maximum allowed value
//    initial: initial default value
//
export class SqlNumberDefinition {
  constructor() {
    this.usage = SqlNumberDefinition.noneString;
    this.minimum = -1;
    this.maximum = -1;
    this.initial = -1;
    this.hasMaxString = false;
  }
  public static requiredString: string = 'Required';
  public static optionalString: string = 'Optional';
  public static noneString: string = 'None';

  public static scheme = {
    usage: String,
    minimum: Number,
    maximum: Number,
    initial: Number,
    hasMaxString: Boolean
  };

  usage: string;
  minimum: number;
  maximum: number;
  initial: number;
  hasMaxString: boolean;

  public static getFactory(): ISqlNumberDefinitionFactory {
    return {
      create: (
        usage: string,
        minimum: number,
        maximum: number,
        initial: number
      ) => {
        const definition = new SqlNumberDefinition();
        definition.usage = usage;
        definition.minimum = minimum;
        definition.maximum = maximum;
        definition.initial = initial;
        return definition;
      }
    };
  }

  isRequiredOrOptional(): boolean {
    return this.isRequired() || this.isOptional();
  }

  isRequired(): boolean {
    return this.usage === SqlNumberDefinition.requiredString;
  }

  isOptional(): boolean {
    return this.usage === SqlNumberDefinition.optionalString;
  }

  isInRange(val: number): boolean {
    return val >= this.minimum && val <= this.maximum;
  }
}
