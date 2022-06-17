import * as React from 'react';

import styles from '../../common/FormFields.module.scss';

import { ISPDateFieldProps, ISPDateFieldState } from ".";
import { FieldActions, FieldLabel } from "../../common";

import { DatePicker, DayOfWeek, defaultDatePickerStrings, TextField } from '@fluentui/react';
import * as moment from 'moment';

export class SPDateField extends React.Component<ISPDateFieldProps, ISPDateFieldState> {
  constructor(props) {
    super(props);
    this.handleDataFormat = this.handleDataFormat.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onFormatDate = this.onFormatDate.bind(this);
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

  private handleOnChange = (date?: Date) => {
    const { props } = this;
    var DataObj: any = props.Data;
    this.setState({ FieldsValue: (date ? date.toString() : null) });
    DataObj[props.FieldName] = (date ? moment(date).format("YYYY-MM-DDT00:00:00Z") : null);

    props.onChange(props.FieldName, DataObj);
  }

  private onFormatDate(date?: Date | String) {
    const { DateFormat } = this.props;
    let format: string = "ddd MMM DD YYYY";
    if (DateFormat !== undefined) {
      format = DateFormat;
    }
    if (date === null){
      return null;
    } else if (typeof (date) === 'string') {
      return moment(date).format(format);
    } else {
      return moment(date.toString()).format(format);
    }
  }

  public componentDidUpdate = (prevProps) => {
    if (this.props.Data[this.props.FieldName] !== prevProps.Data[this.props.FieldName]) {
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
          IconName="Calendar"
        />
        {!(_fieldActions.isReadOnly()) && !(_fieldActions.isDisabled()) ?
          <DatePicker
            firstDayOfWeek={DayOfWeek.Monday}
            placeholder="Select a date..."
            ariaLabel="Select a date"
            strings={defaultDatePickerStrings}
            value={FieldsValue && FieldsValue !== null ? moment(FieldsValue).toDate() : undefined}
            className={_fieldActions.getClassNames()}
            formatDate={this.onFormatDate}
            onSelectDate={(date) => this.handleOnChange(date)}
          />
          : <TextField
            readOnly={_fieldActions.isReadOnly()}
            disabled={_fieldActions.isDisabled()}
            className={_fieldActions.getClassNames()}
            value={FieldsValue !== undefined ? this.onFormatDate(FieldsValue) : undefined}
            iconProps={iconProps}
          />
        }
      </div>
    );
  }
}