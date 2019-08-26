export const dataTypes = [
    {
        clientSupported: false,
        clrEquivalentType: 'System.Byte[], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Binary object',
        displayName: 'binary',
        name: 'binary',
        parameters: [
            {
                hasMaxString: true,
                initial: 30,
                maximum: 8000,
                minimum: 1,
                usage: 'Required'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Byte[], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Variable binary object',
        displayName: 'varbinary',
        name: 'varbinary',
        parameters: [
            {
                hasMaxString: true,
                initial: 30,
                maximum: 8000,
                minimum: 1,
                usage: 'Required'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Array of character values',
        displayName: 'char',
        name: 'char',
        parameters: [
            {
                hasMaxString: false,
                initial: 1,
                maximum: 8000,
                minimum: 1,
                usage: 'Optional'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Array of unicode character values',
        displayName: 'nchar',
        name: 'nchar',
        parameters: [
            {
                hasMaxString: false,
                initial: 1,
                maximum: 4000,
                minimum: 1,
                usage: 'Optional'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'String of character values',
        displayName: 'varchar',
        name: 'varchar',
        parameters: [
            {
                hasMaxString: true,
                initial: 255,
                maximum: 8000,
                minimum: 1,
                usage: 'Required'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: true,
        clrEquivalentType: 'System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'String of unicode character values',
        displayName: 'Text',
        name: 'nvarchar',
        parameters: [
            {
                hasMaxString: true,
                initial: 255,
                maximum: 4000,
                minimum: 1,
                usage: 'Required'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.DateTime, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Date and Time value, e.g. 10/12/2011 18:45.00',
        displayName: 'datetime',
        name: 'datetime',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: true,
        clrEquivalentType: 'System.DateTime, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: ['nvarchar'],
        description: 'Date and Time value, e.g. 10/12/2011 18:45.00',
        displayName: 'Date/Time',
        name: 'datetime2',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.DateTime, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Low resolution Date and Time value, e.g. 10/12/2011 18:45.00',
        displayName: 'smalldatetime',
        name: 'smalldatetime',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: true,
        clrEquivalentType: 'System.DateTime, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: ['nvarchar'],
        description: 'Date, e.g. 10/12/2011',
        displayName: 'Date',
        name: 'date',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: true,
        clrEquivalentType: 'System.TimeSpan, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: ['nvarchar'],
        description: 'Time of day on a 24-hour clock, e.g. 18:45.00',
        displayName: 'Time',
        name: 'time',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.DateTimeOffset, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Date-time offset',
        displayName: 'datetimeoffset',
        name: 'datetimeoffset',
        parameters: [
            {
                hasMaxString: false,
                initial: 7,
                maximum: 7,
                minimum: 0,
                usage: 'Optional'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: true,
        clrEquivalentType: 'System.Decimal, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: ['nvarchar'],
        description: 'Decimal number with specified precision. Example 12345.45 has maxlength of 7 digits and decimal precision of 2',
        displayName: 'Decimal',
        name: 'decimal',
        parameters: [
            {
                hasMaxString: false,
                initial: 18,
                maximum: 38,
                minimum: 1,
                usage: 'Required'
            },
            {
                hasMaxString: false,
                initial: 2,
                maximum: 38,
                minimum: 0,
                usage: 'Optional'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Decimal, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Decimal number with specified precision. Example 12345.45 has maxlength of 7 digits and decimal precision of 2',
        displayName: 'numeric',
        name: 'numeric',
        parameters: [
            {
                hasMaxString: false,
                initial: 18,
                maximum: 38,
                minimum: 1,
                usage: 'Required'
            },
            {
                hasMaxString: false,
                initial: 2,
                maximum: 38,
                minimum: 0,
                usage: 'Optional'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Double, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Floating point number',
        displayName: 'float',
        name: 'float',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Single, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Real (floating point) number',
        displayName: 'real',
        name: 'real',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Int64, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Big integer: +/- 9,223,372,036,854,775,807',
        displayName: 'bigint',
        name: 'bigint',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: true,
        clrEquivalentType: 'System.Int32, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: ['nvarchar', 'decimal'],
        description: 'Regular integer: +/- 2,147,483,647',
        displayName: 'Integer',
        name: 'int',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Int16, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Small integer: +/- 32,767',
        displayName: 'smallint',
        name: 'smallint',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Byte, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Tiny integer: 0 to 255',
        displayName: 'tinyint',
        name: 'tinyint',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Decimal, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Money: +/- 922,337,203,685,477.5807',
        displayName: 'money',
        name: 'money',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Decimal, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Small Money: +/- 214,748.3647',
        displayName: 'smallmoney',
        name: 'smallmoney',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: true,
        clrEquivalentType: 'System.Boolean, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: ['nvarchar'],
        description: 'Boolean flag (true or false)',
        displayName: 'True/False',
        name: 'bit',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Guid, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Unique identifier',
        displayName: 'uniqueidentifier',
        name: 'uniqueidentifier',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Byte[], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Timestamp - DEPRECATED',
        displayName: 'timestamp',
        name: 'timestamp',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Byte[], mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Image - DEPRECATED',
        displayName: 'image',
        name: 'image',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Unicode text string - DEPRECATED',
        displayName: 'ntext',
        name: 'ntext',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Text string - DEPRECATED',
        displayName: 'text',
        name: 'text',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'SQL Variant - accepts any SQL type',
        displayName: 'sql_variant',
        name: 'sql_variant',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    },
    {
        clientSupported: false,
        clrEquivalentType: 'System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089',
        compatibleConversions: null,
        description: 'Xml object',
        displayName: 'xml',
        name: 'xml',
        parameters: [
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            },
            {
                hasMaxString: false,
                initial: -1,
                maximum: -1,
                minimum: -1,
                usage: 'None'
            }
        ]
    }
];