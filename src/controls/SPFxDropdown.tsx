import * as React from 'react';
import { useState, useEffect } from "react";
import styles from '../common/FormFields.module.scss';
import { FieldActions, FieldLabel } from "../common";
import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';

export interface ISPFxDropdownProps {
    Label: string;
    Data?: any;
    Value?: string | number;
    FieldName?: string;
    Options?: IDropdownOption[];
    ListId?: string;
    MultiSelect?: boolean;
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
    Props?: IDropdownProps;
}

export const SPFxDropdown: React.FunctionComponent<ISPFxDropdownProps> = React.forwardRef<HTMLElement, ISPFxDropdownProps>(
    (props, forwardedRef) => {
        const _fieldActions: FieldActions = new FieldActions(props);
        const [selectedKeys, setSelectedKeys] = useState(_handleDataFormat);
        useEffect(() => {
            setSelectedKeys(_handleDataFormat);
        }, [_handleDataFormat]);
        const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;

        function _handleDataFormat(): Array<string | number> {
            return props.Data !== undefined
                && props.Data !== null
                && Object.keys(props.Data).length > 0
                && props.Data[props.FieldName] !== null
                ? props.Data[props.FieldName] : null;
        }

        function _handleOnChange(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
            let selectedKey: Array<string | number> = [];
            const dataObj: any = props.Data;

            if (!selectedKey) {
                dataObj[props.FieldName] = null;
            } else if (_fieldActions.isMultiSelect()) {
                if (item) {
                    selectedKey = item.selected ? [...selectedKeys, item.key as string] : selectedKeys.filter(key => key !== item.key);
                }
                dataObj[props.FieldName] = selectedKey;
            } else {
                if (item) {
                    selectedKey.push(item.key);
                }
                setSelectedKeys(selectedKey);
                dataObj[props.FieldName] = selectedKey[0];
            }
            props.onChange(event, dataObj, props.FieldName);
        }
        let selectedKeyValue: string | number = null;
        const selectedKeyValues: string[] | number[] = [] as string[] | number[];
        let readyOnlyValue: string = "";
        if (_fieldActions.isMultiSelect()) {
            selectedKeys.forEach((value, index) => {
                selectedKeyValues[index] = value;
            });
            selectedKeys.forEach((key => {
                readyOnlyValue += _fieldActions.isReadOnly() && `${props.Options.filter((item => item.key === key))[0].text}, `;
            }));
            readyOnlyValue = _fieldActions.isReadOnly() && readyOnlyValue !== null && readyOnlyValue.slice(0, readyOnlyValue.length - 2);
        } else {
            if (typeof (selectedKeys) === 'string' || typeof (selectedKeys) === 'number') {
                selectedKeyValue = selectedKeys;
            }
            readyOnlyValue = _fieldActions.isReadOnly() && selectedKeys && props.Options.filter((item => item.key === selectedKeyValue))[0].text;
        }
        return (
            <div className={styles.fieldContainer}>
                <FieldLabel
                    Label={props.Label}
                    Required={_fieldActions.isRequired()}
                    UseIcon={_fieldActions.hasIcon()}
                    TipTool={_fieldActions.hasTipTool()}
                    IconName="Dropdown"
                />

                {!_fieldActions.isMultiSelect() && !(_fieldActions.isReadOnly()) &&
                    <Dropdown
                        placeholder="Select an option"
                        multiSelect={_fieldActions.isMultiSelect()}
                        options={props.Options}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        errorMessage={_fieldActions.getErrorMessage()}
                        onChange={(event, item) => _handleOnChange(event, item)}
                        selectedKey={selectedKeyValue}
                    />
                }
                {_fieldActions.isMultiSelect() && !(_fieldActions.isReadOnly()) &&
                    <Dropdown
                        placeholder="Select an option"
                        multiSelect={_fieldActions.isMultiSelect()}
                        options={props.Options}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        errorMessage={_fieldActions.getErrorMessage()}
                        onChange={(event, item) => _handleOnChange(event, item)}
                        selectedKeys={selectedKeyValues}
                    />
                }
                {(_fieldActions.isReadOnly()) &&
                    <TextField
                        readOnly={_fieldActions.isReadOnly()}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        value={readyOnlyValue}
                        iconProps={iconProps}
                    />
                }
            </div>
        );
    }
);