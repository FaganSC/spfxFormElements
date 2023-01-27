import * as React from 'react';
import { useState, useEffect } from "react";
import styles from '../common/FormFields.module.scss';
import { FieldActions, FieldLabel } from "../common";
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@uifabric/styling/lib/MergeStyles';
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupProps } from '@fluentui/react/lib/ChoiceGroup';

export interface ISPFxChoiceProps {
    Label: string;
    Data?: any;
    Value?: string | number;
    FieldName?: string;
    Choices: IChoiceGroupOption[];
    Layout?: SPFxChoiceLayout;
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
    Props?: IChoiceGroupProps;
}

export enum SPFxChoiceLayout {
    Vertical,
    Horizontal
}

export const SPFxChoice: React.FunctionComponent<ISPFxChoiceProps> = React.forwardRef<HTMLElement, ISPFxChoiceProps>(
    (props, forwardedRef) => {
        const _fieldActions: FieldActions = new FieldActions(props);
        const [Value, setValue] = useState(_handleDataFormat);
        useEffect(() => {
            setValue(_handleDataFormat);
        }, [_handleDataFormat]);
        const iconClass = mergeStyles({
            fontSize: 20
        });
        const iconCheckedClass = Value && mergeStyles({
            color: "#0078d4"
        });
        const HorizontalLayout = props.Layout === SPFxChoiceLayout.Horizontal ? styles.SPFxChoiceHorizontal : undefined;
        const readonlyChoices = props.Choices.map((choice: IChoiceGroupOption, index: number) => {
            return (<div key={index} >
                {choice.key === Value ?
                    <Icon className={mergeStyles(iconClass, iconCheckedClass, styles.fieldIcon)} iconName="RadioBtnOn" /> :
                    <Icon className={mergeStyles(iconClass, iconCheckedClass, styles.fieldIcon)} iconName="RadioBtnOff" />
                }
                {choice.text}
            </div>);
        });

        function _handleDataFormat(): string | number {
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

        function _handleOnChange(event: React.FormEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOption): void {
            const FieldsValue: string | number = (option ? option.key : null);
            const dataObj: any = props.Data;
            let dataValue: string | number = props.Value;
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
                    IconName="GroupedList"
                />
                {!(_fieldActions.isReadOnly()) ?
                    <ChoiceGroup
                        options={props.Choices}
                        selectedKey={Value}
                        className={_fieldActions.getClassNames(HorizontalLayout)}
                        disabled={_fieldActions.isDisabled()}
                        onChange={(event, option) => _handleOnChange(event, option)}
                    /> :
                    <div className={props.Layout === SPFxChoiceLayout.Horizontal ?
                        [styles.readOnly, styles.SPHorizontalLayoutReadOnly].join(' ') :
                        styles.readOnly}>
                        {readonlyChoices}
                        <Icon className={mergeStyles(styles.lockIcon, styles.fieldIcon)} iconName={"Lock"} />
                    </div>
                }
            </div>
        );
    }
);