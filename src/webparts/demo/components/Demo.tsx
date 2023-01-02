import * as React from 'react';
import styles from './Demo.module.scss';
import { IDemoProps } from './IDemoProps';
import { IDemoState } from './IDemoState';
import { IDemoModel } from './DemoModel';
import { Toggle } from '@fluentui/react/lib/components/Toggle';
import { SPTextBox } from '../../../controls/SPTextBox';
import { SPMultipleLine } from '../../../controls/SPMultipleLine';
import { SPToggle } from '../../../controls/SPToggle';

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
          Toggle1: true,
          Toggle2: true,
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
            <td><Toggle checked={testTipTool} label={"TipTool?"} onText="Yes" offText="No" onChange={(event, checked) => { this.setState({ testTipTool: checked, testTipToolMsg: checked ? "Use Tip Tool to descript field" : null })}} /></td>
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
            <td>{JSON.stringify(testData.Toggle1)}</td>
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
            <td>{JSON.stringify(testData.Toggle2)}</td>
          </tr>
        </table>
      </div>
    );
  }
}
