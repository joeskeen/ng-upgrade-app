import * as angular from 'angular';
import * as _ from 'lodash';

import { Field } from '../Domain/Field';
import { IFieldMappingModel, MappingModel } from '../Domain/MappingModel';
import { SqlType } from '../Domain/SqlType';
import {
  IRootScopeService,
  IAugmentedJQuery,
  IScope,
  IAttributes,
  ICompileService,
  IDirective
} from 'angular';

interface IInputData {
  inputTag: string;
  inputType: string;
  inputClass: string;
  selfClosing: boolean;
}

interface IFormGroupDefinition {
  errorOffset: string;
  field: string;
  text: string;
  action: (entity: any, fieldName: string) => void;
  required: boolean;
}

export class HcFormField implements IDirective {
  constructor(private $compile: ICompileService) {}
  private static textAreaThreshold: number = 255;
  public restrict: string = 'EA';
  private customInputAllowed: boolean;
  private isMultiFieldMapping: boolean;
  private isLookupListField: boolean = false;
  private isQuickListField: boolean = false;

  public scope = {
    fieldDefinition: '=hcFieldDefinition',
    model: '=hcRecord',
    mappings: '=hcMappings',
    modalDropdownMenu: '=hcModalDropdownMenu'
  };

  public static hcFormFieldFactory($compile) {
    return new HcFormField($compile);
  }

  public link = (
    scope: IScope,
    element: IAugmentedJQuery,
    attributes: IAttributes
  ) => {
    console.log('linking hcFormField', scope);
    const inputOnlyAttribute = attributes['hcInputOnly'];
    const isInputOnly =
      inputOnlyAttribute !== undefined &&
      inputOnlyAttribute !== null &&
      (inputOnlyAttribute === '' ||
        inputOnlyAttribute.toLowerCase() === 'true');
    const fieldDefinition: Field = scope['fieldDefinition'];
    const isCheckbox = fieldDefinition.dataType.name === 'bit';
    const mappings: Array<MappingModel> = scope['mappings'];

    this.customInputAllowed = this.checkCustomInputFlag(
      fieldDefinition.name,
      mappings
    );
    this.isMultiFieldMapping = this.checkForMultiFieldMapping(
      fieldDefinition,
      mappings
    );
    this.isLookupListField = attributes['hcLookupField'] === 'true';
    this.isQuickListField = attributes['hcQuickListField'] === 'true';

    const template = this.generateTemplate(
      scope,
      fieldDefinition,
      isInputOnly,
      isCheckbox,
      null,
      []
    );

    const newElement: IAugmentedJQuery = angular.element(template);
    element.append(newElement);
    this.$compile(newElement)(scope);

    scope.$on('$destroy', () => {
      if (newElement) {
        newElement.remove();
      }
    });
  };

  private generateTemplate(
    scope: IRootScopeService,
    fieldDefinition: Field,
    isInputOnly: boolean,
    isCheckbox: boolean,
    inputGroupDefinition?: IFormGroupDefinition,
    mappings: Array<MappingModel> = []
  ): string {
    const label = this.generateLabel(fieldDefinition, isInputOnly);

    let input: string;
    if (
      inputGroupDefinition &&
      (inputGroupDefinition.text || inputGroupDefinition.action)
    ) {
      input = this.generateInputGroup(fieldDefinition, inputGroupDefinition);
    } else {
      input = this.generateInput(
        scope,
        fieldDefinition,
        isInputOnly,
        isCheckbox
      );
    }

    const errorOffset = inputGroupDefinition
      ? inputGroupDefinition.errorOffset
      : '';
    const errorAlert = this.generateErrorAlert(
      fieldDefinition,
      false,
      errorOffset
    );
    return label + input + errorAlert;
  }

  private generateLabel(fieldDefinition: Field, isInputOnly: boolean) {
    const name = fieldDefinition.name;
    const srOnly = isInputOnly ? ' sr-only' : '';
    const uniqueKey =
      isInputOnly || !fieldDefinition.isUniqueKey
        ? ''
        : ' <span tabindex="-1" class="ico ico-star" aria-hidden="true" uib-popover="This field is part of a unique key"' +
          ' data-popover-placement="right" data-popover-trigger="\'click\'"></span>';
    const helpIcon =
      isInputOnly || !fieldDefinition.helpText
        ? ''
        : '&nbsp;<span tabindex="-1" class="ico ico-info-circle" aria-hidden="true" uib-popover="' +
          fieldDefinition.helpText +
          '" data-popover-placement="right" data-popover-trigger="\'click\'"></span>';
    return (
      '<label class="control-label' +
      srOnly +
      '" for="' +
      fieldDefinition.name +
      '">' +
      (fieldDefinition.displayLabel || name) +
      '</label>' +
      uniqueKey +
      helpIcon
    );
  }

  private generateInput(
    scope: IRootScopeService,
    fieldDefinition: Field,
    isInputOnly: boolean,
    isCheckbox: boolean
  ) {
    const name = fieldDefinition.name;
    const camelName = fieldDefinition.name;
    const ngModel =
      'id="' +
      name +
      '" name="' +
      name +
      '" data-ng-model="model[\'' +
      camelName +
      '\']" ';
    const options = fieldDefinition.options;
    const callback = fieldDefinition.refreshOptionsCallback;
    const inputData: IInputData = this.getInputData(
      fieldDefinition.dataType,
      isInputOnly && !this.isMultiFieldMapping
    );

    const canEdit = true;
    const canAdd = true;
    const customInputAllowed =
      this.isMultiFieldMapping && !this.customInputAllowed;
    const applicationOrGlobalLookupField =
      this.isLookupListField || this.isQuickListField;

    let disabled = '';
    if (
      !applicationOrGlobalLookupField &&
      ((!canAdd && !canEdit) || customInputAllowed)
    ) {
      if (isCheckbox) {
        disabled = 'disabled="disabled"';
      } else {
        disabled = 'readonly="true"';
      }
    }

    if (this.isMultiFieldMapping && canEdit && canAdd) {
      return `
                <div class="input-group">
                    <input ${ngModel}${inputData.inputType}
                           class="${inputData.inputClass}"
                           ${disabled} />
                    <span class="input-group-btn">
                        <button type="button"
                                class="btn btn-default btn-calendar"
                                data-ng-show="$parent.tab.showClear(fieldDefinition, model)"
                                data-ng-click="$parent.tab.clearMappedField(fieldDefinition, model)">
                            <span class="ico ico-close"></span>
                        </button>
                        <button type="button"
                                class="btn btn-default btn-calendar"
                                data-ng-click="$parent.tab.openMultiFieldMappings(fieldDefinition, model, mappings)"
                                tabindex="-1">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
            `;
    }

    if ((options && options.length) || callback) {
      scope['optionText'] = () => {
        const modelValue = scope['model'][fieldDefinition.name];
        const foundOption = _.find(fieldDefinition.options, option => {
          return option.value === modelValue;
        });
        return foundOption ? foundOption.text : modelValue;
      };

      const allowClear = fieldDefinition.isRequired ? '' : 'allow-clear="true"';
      const boundValue =
        this.customInputAllowed && fieldDefinition.id !== 0
          ? '{{model.' + camelName + '}}'
          : '{{$select.selected.text}}';
      const customInput = this.customInputAllowed
        ? ' data-refresh="fieldDefinition.addCustomInput($select)" data-refresh-delay="0"'
        : '';
      const refresh = callback
        ? ' data-refresh="fieldDefinition.refreshOptions(index)" data-refresh-delay="0"'
        : customInput;
      return (
        '<div>' +
        '<div data-ui-select remove-selected="false" data-append-to-body="true" theme="bootstrap"' +
        ngModel +
        ' >' +
        '<div data-ui-select-match ' +
        allowClear +
        ' placeholder="Select or search...">' +
        boundValue +
        '</div>' +
        '<div data-ui-select-choices data-repeat= "item.value as item in fieldDefinition.options | filter: {text: $select.search, hidden: false}"' +
        refresh +
        '>' +
        '<div data-ng-bind-html="item.text | highlight: $select.search">' +
        '</div></div></div></div>'
      );
    }

    if (this.isDatePickerControl(fieldDefinition)) {
      return `<input type="date" data-ng-model="model.value" />`;
    }

    const closingTag = inputData.selfClosing
      ? ' />'
      : '></' + inputData.inputTag + '>';
    return (
      '<' +
      inputData.inputTag +
      ' class="' +
      inputData.inputClass +
      '"' +
      inputData.inputType +
      disabled +
      ' ' +
      ngModel +
      closingTag
    );
  }

  private generateInputGroup(
    fieldDefinition: Field,
    inputGroupDefinition: IFormGroupDefinition
  ): string {
    const name = fieldDefinition.name;
    // prettier-ignore
    const modelReference = 'model[\'' + fieldDefinition.name + '\']';
    const ngModel = 'data-ng-model="' + modelReference + '"';
    const required = inputGroupDefinition.required
      ? ' data-ng-readonly="!' + modelReference + '"'
      : '';

    return (
      '<div class="input-group"><input class="form-control input-sm" type="text" id="' +
      name +
      '" name="' +
      name +
      '" ' +
      ngModel +
      '" ' +
      ' /><span class="input-group-btn"><button' +
      required +
      ' class="btn btn-default" type="button" data-ng-click="executeFormGroupAction()">' +
      inputGroupDefinition.text +
      '</button></span></div>'
    );
  }

  private getInputData(dataType: SqlType, isInputOnly: boolean): IInputData {
    const notLongText =
      dataType.name !== 'nvarchar' ||
      +dataType.parameters[0] <= HcFormField.textAreaThreshold;
    return {
      inputTag: notLongText ? 'input' : 'textarea',
      inputType: notLongText ? this.generateInputType(dataType) : '',
      inputClass:
        dataType.name !== 'bit'
          ? 'form-control' + (isInputOnly ? ' input-sm' : '')
          : 'checkbox gridCheckbox',
      selfClosing: notLongText
    };
  }

  private generateInputType(dataType: SqlType): string {
    let type = 'text';
    if (dataType.name === 'bit') {
      type = 'checkbox';
    }
    if (dataType.name === 'int') {
      type = 'number';
    }
    return `type="${type}"`;
  }

  private generateErrorAlert(
    fieldDefinition: Field,
    isDisplayOnly: boolean,
    errorOffset?: string
  ): string {
    const moveErrorLeft =
      !isDisplayOnly &&
      (this.isMultiFieldMapping ||
        (fieldDefinition.options && fieldDefinition.options.length) ||
        this.isDatePickerControl(fieldDefinition));
    const errorOffsetString = errorOffset
      ? ' style="right: ' + errorOffset + ';"'
      : '';

    return this.shouldAddErrorAlert(fieldDefinition.dataType)
      ? '<span data-error-alert data-datatype="' +
          fieldDefinition.dataType.name +
          '" data-target="' +
          fieldDefinition.name +
          '" data-feedback="true" data-shift-left="' +
          (moveErrorLeft ? 'true' : 'false') +
          '"' +
          errorOffsetString +
          '></span>'
      : '';
  }

  private isDatePickerControl(fieldDefinition: Field) {
    return (
      fieldDefinition.dataType.name === 'datetime2' ||
      fieldDefinition.dataType.name === 'date' ||
      fieldDefinition.dataType.name === 'time'
    );
  }

  private shouldAddErrorAlert(dataType: SqlType): boolean {
    return dataType.name !== 'bit';
  }

  private checkCustomInputFlag(
    fieldName: string,
    mappings: Array<MappingModel>
  ) {
    if (!mappings) {
      return false;
    }

    for (let i = 0; i < mappings.length; i++) {
      for (let j = 0; j < mappings[i].fieldMappings.length; j++) {
        if (mappings[i].fieldMappings[j].applicationColumnName === fieldName) {
          return mappings[i].fieldMappings[j].allowCustomInput;
        }
      }
    }
    return true;
  }

  private checkForMultiFieldMapping(
    field: Field,
    mappings: Array<MappingModel>
  ): boolean {
    if (!mappings) {
      return false;
    }

    return _.some(mappings, (map: MappingModel) => {
      return (
        !map.isDropDownList() &&
        _.some(map.fieldMappings, (col: IFieldMappingModel) => {
          return col.applicationColumnName === field.name;
        })
      );
    });
  }
}

HcFormField.hcFormFieldFactory['$inject'] = ['$compile'];
