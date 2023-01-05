import * as React from 'react';
import styles from './Demo.module.scss';
import { IDemoProps } from './IDemoProps';
import { IDemoState } from './IDemoState';
import { IDemoModel } from './DemoModel';
import { dropdownNumberData, dropdownStringData, radioHorizontalChoices, radioVerticalChoices } from './SampleData';
import { Toggle } from '@fluentui/react/lib/components/Toggle';
import { SPTextBox } from '../../../controls/SPTextBox';
import { SPMultipleLine } from '../../../controls/SPMultipleLine';
import { SPToggle } from '../../../controls/SPToggle';
import { SPCheckBox } from '../../../controls/SPCheckBox';
import { SPChoice, SPChoiceLayout } from '../../../controls/SPChoice';
import { SPDropdown } from '../../../controls/SPDropdown';
import { SPDateTime } from '../../../controls/SPDateTime';
import { SPNumberField } from '../../../controls/SPNumberField';
import { SPCurrencyField } from '../../../controls';

export default class Demo extends React.Component<IDemoProps, IDemoState> {
  constructor(props: IDemoProps) {
    super(props);
    this.state = {
      testRequired: false,
      testDisabled: false,
      testReadOnly: false,
      testIcon: false,
      testTipTool: false,
      testDefaultData: false,
      testData: new IDemoModel()
    };
  }

  private _onFormFieldChange = async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent<HTMLElement>, data: any, fieldName: string): Promise<void> => {
    console.log(data);
    console.log(event);
    this.setState({ testData: data });
  }

  private _setData = (checked: boolean): void => {
    if (checked) {
      this.setState({
        testDefaultData: checked,
        testData: {
          TextBox: "Plain Text Box Data",
          MultipleLine: "Multiple Line Text Block",
          WholeNumber: 1000,
          DecimalNumber: 10.5015,
          DecimalNumberTwo: 10.50,
          USDCurrency: "100000.00",
          Toggle1: true,
          Toggle2: true,
          CheckBox: true,
          RadioVertical: "apple",
          RadioHorizontal: "carrot",
          DropDownSingleString: "apple",
          DropDownSingleNumber: 5,
          DropDownMultipleString: ["apple", "carrot"],
          DropDownMultipleNumber: [2, 5],
          DatePicker: "2022-05-01T00:00:00Z",
          DatePicker2: "2022-06-01T00:00:00Z",
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
    const { testData, testRequired, testDisabled, testReadOnly, testIcon, testDefaultData, testTipTool, testTipToolMsg } = this.state;
    return (
      <div className={styles.demo}>
        <table width={"100%"}>
          <tr>
            <td><Toggle checked={testDefaultData} label={"Default Data?"} onText="Yes" offText="No" onChange={(event, checked) => this._setData(checked)} /></td>
            <td><Toggle checked={testRequired} label={"Required?"} onText="Yes" offText="No" onChange={(event, checked) => this.setState({ testRequired: checked })} /></td>
            <td><Toggle checked={testDisabled} label={"Disabled?"} onText="Yes" offText="No" onChange={(event, checked) => this.setState({ testDisabled: checked })} /></td>
            <td><Toggle checked={testReadOnly} label={"ReadOnly?"} onText="Yes" offText="No" onChange={(event, checked) => this.setState({ testReadOnly: checked })} /></td>
            <td><Toggle checked={testIcon} label={"Field Icon?"} onText="Yes" offText="No" onChange={(event, checked) => this.setState({ testIcon: checked })} /></td>
            <td><Toggle checked={testTipTool} label={"TipTool?"} onText="Yes" offText="No" onChange={(event, checked) => { this.setState({ testTipTool: checked, testTipToolMsg: checked ? "Use Tip Tool to descript field" : null }) }} /></td>
          </tr>
        </table><table width={"100%"}>
          <tr>
            <th>Form Elements</th>
            <th>SharePoint Data</th>
          </tr>
          <tr>
            <td>
              <SPTextBox
                Data={testData}
                FieldName="TextBox"
                Label='Text Box (Form Object Data)'
                PlaceHolder='Enter Value for Form Data'
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
              />
            </td>
            <td><b>{testData.TextBox}</b></td>
          </tr>
          <tr>
            <td>
              <SPMultipleLine
                Data={testData}
                FieldName="MultipleLine"
                Label='Multiple Line Text Block'
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
                Props={{ resizable: true }}
              />
            </td>
            <td><b>{testData.MultipleLine}</b></td>
          </tr>
          <tr>
            <td>
              <SPNumberField
                Data={testData}
                FieldName="WholeNumber"
                Label='Whole Numbers'
                DecimalScale={0}
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
              />
            </td>
            <td><b>{testData.WholeNumber}</b></td>
          </tr>
          <tr>
            <td>
              <SPNumberField
                Data={testData}
                FieldName="DecimalNumber"
                Label='Decimal Numbers (No Limit)'
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
              />
            </td>
            <td><b>{testData.DecimalNumber}</b></td>
          </tr>
          <tr>
            <td><SPNumberField
              Data={testData}
              FieldName="DecimalNumberTwo"
              Label='Decimal Numbers (Two)'
              DecimalScale={2}
              Required={testRequired}
              Disabled={testDisabled}
              ReadOnly={testReadOnly}
              UseIcon={testIcon}
              TipTool={testTipToolMsg}
              onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
            />
            </td>
            <td><b>{testData.DecimalNumberTwo}</b></td>
          </tr>
          <tr>
            <td>
              <SPCurrencyField
                Data={testData}
                FieldName="USDCurrency"
                Label='USD Currency'
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
              />
            </td>
            <td><b>{testData.USDCurrency}</b></td>
          </tr>
          <tr>
            <td>
              <SPToggle
                Data={testData}
                FieldName="Toggle1"
                Label='Toggle 1'
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                onChange={(ev: React.MouseEvent<HTMLElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
              />
            </td>
            <td><b>{JSON.stringify(testData.Toggle1)}</b></td>
          </tr>
          <tr>
            <td>
              <SPToggle
                Data={testData}
                FieldName="Toggle2"
                Label='Toggle 2'
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                OffText={"No"}
                OnText={"Yes"}
                onChange={(ev: React.MouseEvent<HTMLElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
              />
            </td>
            <td><b>{JSON.stringify(testData.Toggle2)}</b></td>
          </tr>
          <tr>
            <td>
              <SPCheckBox
                Data={testData}
                FieldName="CheckBox"
                Label='Checkbox'
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
              />
            </td>
            <td><b>{JSON.stringify(testData.CheckBox)}</b></td>
          </tr>
          <tr>
            <td>
              <SPChoice
                Data={testData}
                FieldName="RadioVertical"
                Label='Radio Buttons (Vertical)'
                Choices={radioVerticalChoices}
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
              />
            </td>
            <td><b>{testData.RadioVertical}</b></td>
          </tr>
          <tr>
            <td>
              <SPChoice
                Data={testData}
                FieldName="RadioHorizontal"
                Label='Radio Buttons (Horizontal)'
                Choices={radioHorizontalChoices}
                Layout={SPChoiceLayout.Horizontal}
                Required={testRequired}
                Disabled={testDisabled}
                ReadOnly={testReadOnly}
                UseIcon={testIcon}
                TipTool={testTipToolMsg}
                onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)}
              />
            </td>
            <td><b>{testData.RadioHorizontal}</b></td>
          </tr>
          <tr>
            <td><SPDropdown
              Data={testData}
              FieldName="DropDownSingleString"
              Label='DropDown Single Select (String Keys)'
              Options={dropdownStringData}
              Required={testRequired}
              Disabled={testDisabled}
              ReadOnly={testReadOnly}
              UseIcon={testIcon}
              TipTool={testTipToolMsg}
              onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)} />
            </td>
            <td><b>{testData.DropDownSingleString}</b></td>
          </tr>
          <tr>
            <td><SPDropdown
              Data={testData}
              FieldName="DropDownSingleNumber"
              Label='DropDown Single Select (Number Keys)'
              Options={dropdownNumberData}
              Required={testRequired}
              Disabled={testDisabled}
              ReadOnly={testReadOnly}
              UseIcon={testIcon}
              TipTool={testTipToolMsg}
              onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)} />
            </td>
            <td><b>{testData.DropDownSingleNumber}</b></td>
          </tr>
          <tr>
            <td><SPDropdown
              Data={testData}
              FieldName="DropDownMultipleString"
              Label='DropDown Multiple Select (String Keys)'
              Options={dropdownStringData}
              MultiSelect
              Required={testRequired}
              Disabled={testDisabled}
              ReadOnly={testReadOnly}
              UseIcon={testIcon}
              TipTool={testTipToolMsg}
              onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)} />
            </td>
            <td><b>{JSON.stringify(testData.DropDownMultipleString)}</b></td>
          </tr>
          <tr>
            <td><SPDropdown
              Data={testData}
              FieldName="DropDownMultipleNumber"
              Label='DropDown Multiple Select (Number Keys)'
              Options={dropdownNumberData}
              MultiSelect
              Required={testRequired}
              Disabled={testDisabled}
              ReadOnly={testReadOnly}
              UseIcon={testIcon}
              TipTool={testTipToolMsg}
              onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)} />
            </td>
            <td><b>{JSON.stringify(testData.DropDownMultipleNumber)}</b></td>
          </tr>
          <tr>
            <td><SPDateTime
              Data={testData}
              FieldName="DatePicker"
              Label='Date Picker (ddd MMM DD YYYY)'
              Required={testRequired}
              Disabled={testDisabled}
              ReadOnly={testReadOnly}
              UseIcon={testIcon}
              TipTool={testTipToolMsg}
              onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)} />
            </td>
            <td><b>{testData.DatePicker}</b></td>
          </tr>
          <tr>
            <td><SPDateTime
              Data={testData}
              FieldName="DatePicker2"
              Label='Date Picker (YYYY-MM-DD)'
              DateFormat='YYYY-MM-DD'
              Required={testRequired}
              Disabled={testDisabled}
              ReadOnly={testReadOnly}
              UseIcon={testIcon}
              TipTool={testTipToolMsg}
              onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, dataObj: any, fieldName: string) => this._onFormFieldChange(ev, dataObj, fieldName)} />
            </td>
            <td><b>{testData.DatePicker2}</b></td>
          </tr>
        </table>
      </div>
    );
  }
}
