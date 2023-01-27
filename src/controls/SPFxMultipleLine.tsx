import * as React from 'react';
import { useState, useEffect } from "react";
import styles from '../common/FormFields.module.scss';
import { FieldActions, FieldLabel } from "../common";
import { ITextFieldProps, TextField } from '@fluentui/react/lib/TextField';

export interface ISPFxMultipleLineProps {
    Label?: string;
    Value?: string;
    Data?: any;
    PlaceHolder?: string;
    MaxLength?: number;
    FieldName?: string;
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
    Props?: ITextFieldProps;
}

export const SPFxMultipleLine: React.FunctionComponent<ISPFxMultipleLineProps> = React.forwardRef<HTMLElement, ISPFxMultipleLineProps>(
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

        function _handleOnChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newTextValue?: string): void {
            const FieldsValue: string = (newTextValue ? newTextValue : null);
            const dataObj: any = props.Data;
            let dataValue: string = props.Value;
            if (typeof dataObj === 'object' && dataObj !== null && dataObj !== undefined) {
                if (FieldsValue === null) {
                    dataObj[props.FieldName] = null;
                } else {
                    dataObj[props.FieldName] = FieldsValue;
                }
                setValue(FieldsValue);
                if (props.onChange !== undefined) {
                    props.onChange(event, dataObj, props.FieldName);
                }
            } else {
                if (newTextValue.length === 0) {
                    dataValue = null;
                } else {
                    dataValue = newTextValue;
                }
                setValue(dataValue);
                if (props.onChange !== undefined) {
                    props.onChange(event, dataValue, props.FieldName);
                }
            }
        }

        return (
            <div className={styles.fieldContainer}>
                <FieldLabel
                    Label={props.Label}
                    Required={_fieldActions.isRequired()}
                    UseIcon={_fieldActions.hasIcon()}
                    TipTool={_fieldActions.hasTipTool()}
                    IconName="TextField"
                />
                <TextField
                    readOnly={_fieldActions.isReadOnly()}
                    disabled={_fieldActions.isDisabled()}
                    className={_fieldActions.getClassNames()}
                    value={Value}
                    iconProps={iconProps}
                    errorMessage={_fieldActions.getErrorMessage()}
                    placeholder={_fieldActions.getPlaceholderText()}
                    autoComplete="off"
                    multiline={true}
                    onChange={(event, value) => _handleOnChange(event, value)}
                    {...props.Props} />
            </div>
        );
    }
);