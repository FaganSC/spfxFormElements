import * as React from 'react';
import styles from './Demo.module.scss';
import { IDemoProps } from './IDemoProps';
import { IDemoState } from './IDemoState';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { SPTextBoxField } from '../../../controls/SPTextBoxField';

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

      testData: {
        TextBox: "Plain Text Data",
      }
    };
  }

  private async onFormFieldChange(fieldName: string, data: any) {
    console.log(data);
    this.setState({ testData: data });
  }

  public render(): React.ReactElement<IDemoProps> {
    const { testData, testRequired, testDisabled, testReadOnly, testIcon, testTipTool, testTipToolMsg } = this.state;
    return (
      <div className={styles.demo}>
        <table width={"100%"}>
          <tr>
            <td><Toggle checked={testRequired} label={"Required?"} onText="Yes" offText="No" onChange={(event, checked) => this.setState({ testRequired: checked })} /></td>
            <td><Toggle checked={testDisabled} label={"Disabled?"} onText="Yes" offText="No" onChanged={(checked) => this.setState({ testDisabled: checked })} /></td>
            <td><Toggle checked={testReadOnly} label={"ReadOnly?"} onText="Yes" offText="No" onChanged={(checked) => this.setState({ testReadOnly: checked })} /></td>
            <td><Toggle checked={testIcon} label={"Field Icon?"} onText="Yes" offText="No" onChanged={(checked) => this.setState({ testIcon: checked })} /></td>
            <td><Toggle checked={testTipTool} label={"TipTool?"} onText="Yes" offText="No" onChanged={(checked) => { checked ? this.setState({ testTipTool: checked, testTipToolMsg: "Use Tip Tool to descript Field" }) : this.setState({ testTipTool: checked, testTipToolMsg: null }); }} /></td>
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
        </table>
      </div>
    );
  }
}
