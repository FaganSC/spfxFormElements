import * as React from 'react';
import { useState, useEffect } from "react";
import styles from '../common/FormFields.module.scss';
import { FieldActions, FieldLabel } from "../common";
import { IToggleProps, Toggle } from '@fluentui/react/lib/Toggle';
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@uifabric/styling/lib/MergeStyles';

export interface ISPFxToggleProps {
    Label: string;
    Data?: any;
    Value?: boolean;
    OffText?: string;
    OnText?: string;
    FieldName?: string;
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
    Props?: IToggleProps;
}

export const SPFxToggle: React.FunctionComponent<ISPFxToggleProps> = React.forwardRef<HTMLElement, ISPFxToggleProps>(
    (props, forwardedRef) => {
        const _fieldActions: FieldActions = new FieldActions(props);
        const [Value, setValue] = useState(_handleDataFormat);
        useEffect(() => {
            setValue(_handleDataFormat);
        }, [_handleDataFormat]);

        const readonlyIcon = Value ? "ToggleRight" : "ToggleLeft";
        const iconClass = mergeStyles({
            fontSize: 40,
            lineHeight: 20
        });
        const iconTrueClass = Value && mergeStyles({
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

        function _handleOnChange(event: React.MouseEvent<HTMLElement>, checked?: boolean): void {
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

        function _getOnText(): string {
            if (props.OnText !== undefined) {
                return props.OnText;
            } else {
                return "On";
            }
        }

        function _getOffText(): string {
            if (props.OffText !== undefined) {
                return props.OffText;
            } else {
                return "Off";
            }
        }

        return (
            <div className={styles.fieldContainer}>
                <FieldLabel
                    Label={props.Label}
                    Required={_fieldActions.isRequired()}
                    UseIcon={_fieldActions.hasIcon()}
                    TipTool={_fieldActions.hasTipTool()}
                    IconName="ToggleRight"
                />
                {!(_fieldActions.isReadOnly()) ?
                    <Toggle
                        checked={Value}
                        className={_fieldActions.getClassNames()}
                        disabled={_fieldActions.isDisabled()}
                        onText={_getOnText()}
                        offText={_getOffText()}
                        onChange={(event, checked) => _handleOnChange(event, checked)}
                    /> :
                    <div className={styles.readOnly}>
                        <Icon className={mergeStyles(iconClass, iconTrueClass, styles.fieldIcon)} iconName={readonlyIcon} />
                        <Icon className={mergeStyles(styles.lockIcon, styles.fieldIcon)} iconName={"Lock"} />
                    </div>
                }
            </div>
        );
    }
);