import * as React from 'react';

import styles from '../../common/FormFields.module.scss';

import { ISPCurrencyFieldProps, ISPCurrencyFieldState } from ".";
import { FieldActions, FieldLabel } from "../../common";

import { TextField } from '@fluentui/react/lib/TextField';
import CurrencyInput from 'react-currency-input';

export class SPCurrencyField extends React.Component<ISPCurrencyFieldProps, ISPCurrencyFieldState> {
  private ValuePrecision: number = this.props.Precision !== undefined ? this.props.Precision : 2;

  constructor(props) {
    super(props);
    this.handleDataFormat = this.handleDataFormat.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      FieldsValue: this.handleDataFormat()
    };

  }

  private handleDataFormat = (): string => {
    return this.props.Data !== undefined
      && this.props.Data !== null
      && Object.keys(this.props.Data).length > 0
      && this.props.Data[this.props.FieldName] !== null
      ? this.props.Data[this.props.FieldName].toString() : null;
  }

  private handleOnChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newTextValue?: string) => {
    const { props } = this;
    var DataObj: any = props.Data;
    this.setState({ FieldsValue: (newTextValue ? newTextValue : null) });    
    DataObj[props.FieldName] = (newTextValue ? newTextValue.replace(/[^\w\/. -]/g, '') : null);
    props.onChange(props.FieldName, DataObj);
  }

  public componentDidUpdate = (prevProps) => {
    if(this.props.Data[this.props.FieldName] !== prevProps.Data[this.props.FieldName]){
        this.setState({ FieldsValue: this.handleDataFormat() });
    }
}

  public render(): JSX.Element {
    const { props } = this;
    const { FieldsValue } = this.state;
    const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;
    let _fieldActions: FieldActions = new FieldActions(props);

    return (
      <div className={styles.fieldContainer}>
        <FieldLabel
          Label={props.Label}
          Required={_fieldActions.isRequired()}
          UseIcon={_fieldActions.hasIcon()}
          TipTool={_fieldActions.hasTipTool()}
          IconName="Money"
        />
        {!(_fieldActions.isReadOnly()) && !(_fieldActions.isDisabled()) ?
          <div className={styles.spfxTextField}>
            <div className={styles.wrapper}>
              <div className={styles.fieldGroup}>
                <div className={styles.prefix}>
                  <span>$</span>
                </div>
                <CurrencyInput className={styles.field} read value={FieldsValue} precision={this.ValuePrecision} onChangeEvent={this.handleOnChange} />
              </div>
            </div>
          </div>
          : <TextField
            prefix='$'
            readOnly={_fieldActions.isReadOnly()}
            disabled={_fieldActions.isDisabled()}
            className={_fieldActions.getClassNames()}
            value={FieldsValue}
            iconProps={iconProps}
            />
        }
      </div>
    );
  }
}