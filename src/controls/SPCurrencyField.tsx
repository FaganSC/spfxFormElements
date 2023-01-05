import * as React from 'react';
import { useState, useEffect } from "react";
import styles from '../common/FormFields.module.scss';
import { FieldActions, FieldLabel } from "../common";
import { ITextFieldProps } from '@fluentui/react/lib/TextField';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Icon } from '@fluentui/react/lib/Icon';

export interface ISPCurrencyFieldProps {
    Label?: string;
    Value?: string;
    Data?: any;
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

export const SPCurrencyField: React.FunctionComponent<ISPCurrencyFieldProps> = React.forwardRef<HTMLElement, ISPCurrencyFieldProps>(
    (props, forwardedRef) => {
        const _fieldActions: FieldActions = new FieldActions(props);
        const [Value, setValue] = useState(_handleDataFormat);
        useEffect(() => {
            if ((Value ? Value.floatValue : null) !== (_handleDataFormat() !== null ? _handleDataFormat().floatValue : null)) {
                console.log(Value);
                console.log(props.Data);
                const temp: NumberFormatValues = _handleDataFormat();
                console.log(temp);
                setValue(temp);
            }
        }, [_handleDataFormat]);

        const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;

        function _handleDataFormat(): NumberFormatValues {
            return props.Data !== undefined
                && props.Data !== null
                && Object.keys(props.Data).length > 0
                && props.Data[props.FieldName] !== null
                ? {
                    formattedValue: props.Data[props.FieldName],
                    value: props.Data[props.FieldName],
                    floatValue: Number(props.Data[props.FieldName])
                }
                : {
                    formattedValue: null,
                    value: null,
                    floatValue: null
                };
        }

        function _handleOnChange(newTextValue?: NumberFormatValues): void {
            const FieldsValue: NumberFormatValues = (newTextValue ? newTextValue : null);
            const dataObj: any = props.Data;
            if (typeof dataObj === 'object' && dataObj !== null && dataObj !== undefined) {
                if (FieldsValue === null) {
                    dataObj[props.FieldName] = null;
                } else {
                    dataObj[props.FieldName] = FieldsValue.value;
                }
                setValue(FieldsValue);
                if (props.onChange !== undefined) {
                    props.onChange(undefined, dataObj, props.FieldName);
                }
            } else {
                setValue(newTextValue);
                if (props.onChange !== undefined) {
                    props.onChange(undefined, newTextValue.floatValue, props.FieldName);
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
                    IconName="NumberField"
                />
                <div className={styles.spfxTextField}>
                    <div className={styles.wrapper}>
                        <div className={styles.fieldGroup}>
                            <div className={styles.prefix}>
                                <span>$</span>
                            </div>
                            <NumericFormat
                                thousandSeparator=","
                                className={styles.field}
                                value={Value !== undefined && Value !== null && Value.formattedValue !== null ? Value.formattedValue : ""}
                                decimalScale={2}
                                onValueChange={(value) => _handleOnChange(value)}
                                readOnly={_fieldActions.isReadOnly()}
                                disabled={_fieldActions.isDisabled()}
                                iconProps={iconProps}
                            />
                            {_fieldActions.isReadOnly() && <Icon className={mergeStyles(styles.lockIcon, styles.fieldIcon)} iconName={"Lock"} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);