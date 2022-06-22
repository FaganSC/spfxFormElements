import * as React from 'react';
import styles from './Demo.module.scss';
import { IDemoProps } from './IDemoProps';
import { IDemoState } from './IDemoState';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { SPTextBoxField } from '../../../SPTextBoxField';
import { SPCurrencyField } from '../../../SPCurrencyField';
import { SPDateField } from '../../../SPDateField';
import { SPPhoneNumberField } from '../../../SPPhoneNumberField';
import { SPNumberField } from '../../../SPNumberField';
import { SPPercentageField } from '../../../SPPercentageField';
import { SPDropDownField } from '../../../SPDropDownField';
import { IDemoModel } from './DemoModel';
import { SPToggleField } from '../../../SPToggleField';
import { SPCheckBoxField } from '../../../SPCheckBoxField';

import { DropdownMenuItemType, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Layout, SPChoiceField } from '../../../SPChoiceField';
import { IAttachedFile, SPListItemFileAttachments } from '../../../SPListItemFileAttachments';

export const dropdownNumberData: IDropdownOption[] = [
  { key: -1, text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 1, text: 'Apple' },
  { key: 2, text: 'Banana' },
  { key: 3, text: 'Orange', disabled: true },
  { key: 4, text: 'Grape' },
  { key: -2, text: '-', itemType: DropdownMenuItemType.Divider },
  { key: -3, text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 5, text: 'Broccoli' },
  { key: 6, text: 'Carrot' },
  { key: 7, text: 'Lettuce' },
];

export const dropdownStringData: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];

export const radioVerticalChoices: IChoiceGroupOption[] = [
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' }
];

export const radioHorizontalChoices: IChoiceGroupOption[] = [
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' }
];
export default class Demo extends React.Component<IDemoProps, IDemoState> {
  constructor(props) {
    super(props);
    this.onFormFieldChange = this.onFormFieldChange.bind(this);
    this.onAttachmentChange = this.onAttachmentChange.bind(this);
    this.state = {
      testRequired: false,
      testDisabled: false,
      testReadOnly: false,
      testIcon: false,
      testTipTool: false,
      testDefaultData: false,
      testData: new IDemoModel(),
      testFiles: []
    };
  }

  private async onFormFieldChange(fieldName: string, data: any) {
    console.log(data);
    this.setState({ testData: data });
  }

  private async onAttachmentChange(files: IAttachedFile[]) {
    console.log(files);
    this.setState({ testFiles: files});
  }

  private setData(checked: boolean) {
    if (checked) {
      this.setState({
        testDefaultData: checked,
        testData: {
          TextBox: "Plain Text Box Data",
          USDCurrency: "100000.00",
          DatePicker: "2022-05-01T00:00:00Z",
          DatePicker2: "2022-06-01T00:00:00Z",
          PhoneNumber: "(555) 123-4567",
          WholeNumber: 1000,
          DecimalNumber: 10.5015,
          DecimalNumberTwo: 10.50,
          Percentage: .5,
          PercentageDecimal: .055,
          DropDownSingleString: "apple",
          DropDownSingleNumber: 5,
          DropDownMultipleString: ["apple", "carrot"],
          DropDownMultipleNumber: [2, 5],
          Toggle1: true,
          Toggle2: true,
          CheckBox: true,
          RadioVertical: "apple",
          RadioHorizontal: "carrot"
        }
      });
    } else {
      this.setState({
        testDefaultData: checked,
        testData: new IDemoModel()
      });
    }
  }

  public render(): React.ReactElement<IDemoProps> {
    const { testData, testFiles, testRequired, testDisabled, testReadOnly, testIcon, testDefaultData, testTipTool, testTipToolMsg } = this.state;
    return (
      <div className={styles.demo}>
        <table width={"100%"}>
          <tr>
            <td><Toggle checked={testDefaultData} label={"Default Data?"} onText="Yes" offText="No" onChange={(event, checked) => this.setData(checked)} /></td>
            <td><Toggle checked={testRequired} label={"Required?"} onText="Yes" offText="No" onChange={(event, checked) => this.setState({ testRequired: checked })} /></td>
            <td><Toggle checked={testDisabled} label={"Disabled?"} onText="Yes" offText="No" onChanged={(checked) => this.setState({ testDisabled: checked })} /></td>
            <td><Toggle checked={testReadOnly} label={"ReadOnly?"} onText="Yes" offText="No" onChanged={(checked) => this.setState({ testReadOnly: checked })} /></td>
            <td><Toggle checked={testIcon} label={"Field Icon?"} onText="Yes" offText="No" onChanged={(checked) => this.setState({ testIcon: checked })} /></td>
            <td><Toggle checked={testTipTool} label={"TipTool?"} onText="Yes" offText="No" onChanged={(checked) => { checked ? this.setState({ testTipTool: checked, testTipToolMsg: "Use Tip Tool to descript field" }) : this.setState({ testTipTool: checked, testTipToolMsg: null }); }} /></td>
          </tr>
        </table><table width={"100%"}>
          <tr>
            <th>Form Elements</th>
            <th>SharePoint Data</th>
          </tr>
          <tr>
            <td><SPTextBoxField Data={testData} FieldName="TextBox" Label='Text Box' Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.TextBox}</b></td>
          </tr>
          <tr>
            <td><SPCurrencyField Data={testData} FieldName="USDCurrency" Label='USD Currency' Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.USDCurrency}</b></td>
          </tr>
          <tr>
            <td><SPDateField Data={testData} FieldName="DatePicker" Label='Date Picker (ddd MMM DD YYYY)' Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.DatePicker}</b></td>
          </tr>
          <tr>
            <td><SPDateField Data={testData} FieldName="DatePicker2" Label='Date Picker (YYYY-MM-DD)' DateFormat='YYYY-MM-DD' Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.DatePicker2}</b></td>
          </tr>
          <tr>
            <td><SPPhoneNumberField Data={testData} FieldName="PhoneNumber" Label='Phone Number' Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.PhoneNumber}</b></td>
          </tr>
          <tr>
            <td><SPNumberField Data={testData} FieldName="WholeNumber" Label='Whole Numbers' DecimalScale={0} Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.WholeNumber}</b></td>
          </tr>
          <tr>
            <td><SPNumberField Data={testData} FieldName="DecimalNumber" Label='Decimal Numbers (No Limit)' Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.DecimalNumber}</b></td>
          </tr>
          <tr>
            <td><SPNumberField Data={testData} FieldName="DecimalNumberTwo" Label='Decimal Numbers (Two)' DecimalScale={2} Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.DecimalNumberTwo}</b></td>
          </tr>
          <tr>
            <td><SPPercentageField Data={testData} FieldName="Percentage" Label='Percentage' DecimalScale={0} Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.Percentage}</b></td>
          </tr>
          <tr>
            <td><SPPercentageField Data={testData} FieldName="PercentageDecimal" Label='Percentage (2 Decimals)' DecimalScale={2} Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.PercentageDecimal}</b></td>
          </tr>
          <tr>
            <td><SPDropDownField Data={testData} FieldName="DropDownSingleString" Label='DropDown Single Select (String Keys)' Options={dropdownStringData} Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.DropDownSingleString}</b></td>
          </tr>
          <tr>
            <td><SPDropDownField Data={testData} FieldName="DropDownSingleNumber" Label='DropDown Single Select (Number Keys)' Options={dropdownNumberData} Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.DropDownSingleNumber}</b></td>
          </tr>
          <tr>
            <td><SPDropDownField Data={testData} FieldName="DropDownMultipleString" Label='DropDown Multiple Select (String Keys)' Options={dropdownStringData} MultiSelect Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{JSON.stringify(testData.DropDownMultipleString)}</b></td>
          </tr>
          <tr>
            <td><SPDropDownField Data={testData} FieldName="DropDownMultipleNumber" Label='DropDown Multiple Select (Number Keys)' Options={dropdownNumberData} MultiSelect Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{JSON.stringify(testData.DropDownMultipleNumber)}</b></td>
          </tr>
          <tr>
            <td><SPToggleField Data={testData} FieldName="Toggle1" Label='Toggle (Default Text)' Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{JSON.stringify(testData.Toggle1)}</b></td>
          </tr>
          <tr>
            <td><SPToggleField Data={testData} FieldName="Toggle2" Label='Toggle (Custom Text)' OnText='True' OffText='False' Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{JSON.stringify(testData.Toggle2)}</b></td>
          </tr>
          <tr>
            <td><SPCheckBoxField Data={testData} FieldName="CheckBox" Label='CheckBox' Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{JSON.stringify(testData.CheckBox)}</b></td>
          </tr>
          <tr>
            <td><SPChoiceField Data={testData} FieldName="RadioVertical" Label='Radio Buttons (Vertical)' Choices={radioVerticalChoices} Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.RadioVertical}</b></td>
          </tr>
          <tr>
            <td><SPChoiceField Data={testData} FieldName="RadioHorizontal" Label='Radio Buttons (Horizontal)' Choices={radioHorizontalChoices} Layout={Layout.Horizontal} Required={testRequired} Disabled={testDisabled} ReadOnly={testReadOnly} UseIcon={testIcon} TipTool={testTipToolMsg} onChange={(fieldName, data) => this.onFormFieldChange(fieldName, data)} /></td>
            <td><b>{testData.RadioHorizontal}</b></td>
          </tr>
          <tr>
            <td colSpan={2}>
              <SPListItemFileAttachments
                Files={testFiles}
                onChange={(file) => this.onAttachmentChange(file)}
                onRemove={(file) => this.onAttachmentChange(file)} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <SPListItemFileAttachments
                Files={testFiles}
                Label='Legal Document Attachments'
                //DocumentType='Legal'
                onChange={(file) => this.onAttachmentChange(file)}
                onRemove={(file) => this.onAttachmentChange(file)} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
