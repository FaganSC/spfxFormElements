import * as React from 'react';
import { useState, useEffect } from "react";
import styles from '../common/FormFields.module.scss';
import { FieldActions, FieldLabel } from "../common";
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@uifabric/styling/lib/MergeStyles';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';

export interface ISPFxCheckBoxProps {
    Label: string;
    Data?: any;
    Value?: boolean;
    FieldName?: string;
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
    Props?: ICheckboxProps;
}

export const SPFxCheckBox: React.FunctionComponent<ISPFxCheckBoxProps> = React.forwardRef<HTMLElement, ISPFxCheckBoxProps>(
    (props, forwardedRef) => {
        const _fieldActions: FieldActions = new FieldActions(props);
        const [Value, setValue] = useState(_handleDataFormat);
        useEffect(() => {
            setValue(_handleDataFormat);
        }, [_handleDataFormat]);
        const readonlyIcon = Value ? "BoxCheckmarkSolid" : "Checkbox";
        const iconClass = mergeStyles({
            fontSize: 20
        });
        const iconCheckedClass = Value && mergeStyles({
            color: "#0078d4"
        });

        function _handleDataFormat(): boolean {
            if (_fieldActions.isControlled()) {
                if (typeof props.Data === 'object') {
                    return props.Data !== undefined
                        && props.Data !== null
                        && Object.keys(props.Data).length > 0
                        && props.Data[props.FieldName] !== null
                        ? props.Data[props.FieldName] : false;
                } else {
                    return props.Value !== undefined
                        && props.Value !== null
                        ? props.Value : false;
                }
            } else {
                return Value;
            }
        }

        function _handleOnChange(event: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean): void {
            const FieldsValue: boolean = (checked ? checked : false);
            const dataObj: any = props.Data;
            let dataValue: boolean = props.Value;
            if (typeof dataObj === 'object' && dataObj !== null && dataObj !== undefined) {
                dataObj[props.FieldName] = FieldsValue;
                setValue(FieldsValue);
                if (props.onChange !== undefined) {
                    props.onChange(event, dataObj, props.FieldName);
                }
            } else {
                dataValue = FieldsValue;
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
                    IconName="CheckboxComposite"
                />
                {!(_fieldActions.isReadOnly()) ?
                    <Checkbox
                        checked={Value}
                        className={_fieldActions.getClassNames()}
                        disabled={_fieldActions.isDisabled()}
                        onChange={(event, checked) => _handleOnChange(event, checked)}
                    /> :
                    <div className={styles.readOnly}>
                        <Icon className={mergeStyles(iconClass, iconCheckedClass, styles.fieldIcon)} iconName={readonlyIcon} />
                        <Icon className={mergeStyles(styles.lockIcon, styles.fieldIcon)} iconName={"Lock"} />
                    </div>
                }
            </div>
        );
    }
);