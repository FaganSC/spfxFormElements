import * as React from 'react';
import styles from './Demo.module.scss';
import { IDemoProps } from './IDemoProps';
import { IDemoState } from './IDemoState';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { SPTextBoxField } from '../../../SPTextBoxField';
import { SPCurrencyField } from '../../../SPCurrencyField';
import { SPDateField } from '../../../SPDateField';

export default class Demo extends React.Component<IDemoProps, IDemoState> {
  constructor(props) {
    super(props);
    this.onFormFieldChange = this.onFormFieldChange.bind(this);
    this.state = {
      testRequired: false,
      testDisabled: false,
      testReadOnly: false,
      testIcon: false,
      testTipTool: false,
      testDefaultData: false,
      testData: {}
    };
  }

  private async onFormFieldChange(fieldName: string, data: any) {
    console.log(data);
    this.setState({ testData: data });
  }

  private setData(checked: boolean) {
    if (checked) {
      this.setState({
        testDefaultData: checked,
        testData: {
          TextBox: "Plain Text Box Data",
          USDCurrency: "100000.00",
          DatePicker: "2022-05-01T00:00:00-04:00",
          DatePicker2: "2022-06-01T00:00:00-04:00"
        }
      });
    } else {
      this.setState({
        testDefaultData: checked,
        testData: {}
      });
    }
  }

  public render(): React.ReactElement<IDemoProps> {
    const { testData, testRequired, testDisabled, testReadOnly, testIcon, testDefaultData, testTipTool, testTipToolMsg } = this.state;
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
        </table>
      </div>
    );
  }
}
