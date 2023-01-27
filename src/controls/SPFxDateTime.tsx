import * as React from 'react';
import { useState, useEffect } from "react";
import styles from '../common/FormFields.module.scss';
import { FieldActions, FieldLabel } from "../common";
import { DayOfWeek } from '@fluentui/date-time-utilities/lib/dateValues/dateValues';
import { DatePicker, defaultDatePickerStrings, IDatePickerProps } from '@fluentui/react/lib/DatePicker';
import { TextField } from '@fluentui/react/lib/TextField';
import * as moment from 'moment';
export interface ISPFxDateTimeProps {
    Label?: string;
    Value?: string;
    Data?: any;
    FieldName?: string;
    MinDate?: Date;
    MaxDate?: Date;
    MonthPickerVisible?: boolean;
    FirstDayOfWeek?: DayOfWeek;
    DateFormat?: string;
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
    Props?: IDatePickerProps;
}

export const SPFxDateTime: React.FunctionComponent<ISPFxDateTimeProps> = React.forwardRef<HTMLElement, ISPFxDateTimeProps>(
    (props, forwardedRef) => {
        const _fieldActions: FieldActions = new FieldActions(props);
        const [Value, setValue] = useState(_handleDataFormat);
        useEffect(() => {
            setValue(_handleDataFormat);
        }, [_handleDataFormat]);

        const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;

        function _handleDataFormat(): string {
            if (_fieldActions.isControlled()) {
                if (typeof props.Data === 'object') {
                    return props.Data !== undefined
                        && props.Data !== null
                        && Object.keys(props.Data).length > 0
                        && props.Data[props.FieldName] !== null
                        ? props.Data[props.FieldName] : null;
                } else {
                    return props.Value !== undefined
                        && props.Value !== null
                        ? props.Value : null;
                }
            } else {
                return Value;
            }
        }

        function _handleOnChange(date?: Date): void {
            const dataObj: any = props.Data;
            setValue(date ? date.toString() : null)
            dataObj[props.FieldName] = (date ? moment(date).format("YYYY-MM-DDT00:00:00Z") : null);
            props.onChange(undefined, dataObj, props.FieldName);
        }

        function _onFormatDate(date?: Date | string) :string{
            let format: string = "ddd MMM DD YYYY";
            if (props.DateFormat !== undefined) {
                format = props.DateFormat;
            }
            if (date === null) {
                return null;
            } else if (typeof (date) === 'string') {
                return moment(date).format(format);
            } else {
                return moment(date.toString()).format(format);
            }
        }

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
                        firstDayOfWeek={props.FirstDayOfWeek === undefined ? DayOfWeek.Sunday : props.FirstDayOfWeek}
                        placeholder="Select a date..."
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                        value={Value && Value !== null ? moment(Value).toDate() : undefined}
                        className={_fieldActions.getClassNames()}
                        maxDate={props.MaxDate !== undefined ? props.MaxDate : null}
                        minDate={props.MinDate !== undefined ? props.MinDate : null}
                        isMonthPickerVisible={props.MonthPickerVisible === undefined ? true : props.MonthPickerVisible}
                        formatDate={_onFormatDate}
                        onSelectDate={(date) => _handleOnChange(date)}
                    />
                    : <TextField
                        readOnly={_fieldActions.isReadOnly()}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        value={Value !== undefined ? _onFormatDate(Value) : undefined}
                        iconProps={iconProps}
                    />
                }
            </div>
        );
    }
);