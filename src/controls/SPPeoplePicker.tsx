import * as React from 'react';
import { useState, useEffect } from "react";
import styles from '../common/FormFields.module.scss';
import { FieldActions, FieldLabel } from "../common";
import { ITextFieldProps, TextField } from '@fluentui/react/lib/TextField';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { IPersonaProps } from '@fluentui/react/lib/Persona';

export class SPUser {
    Id: number;
    Title: string;
    Email: string;
}

export interface ISPPeoplePickerProps {
    Context: any;
    Label?: string;
    Value?: string;
    Data?: any;
    PrincipalType?: PrincipalType;
    GroupName?: string;
    PeopleLimit?: number;
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

export const SPPeoplePicker: React.FunctionComponent<ISPPeoplePickerProps> = React.forwardRef<HTMLElement, ISPPeoplePickerProps>(
    (props, forwardedRef) => {
        const _fieldActions: FieldActions = new FieldActions(props);
        const [Value, setValue] = useState(_handleDataFormat);
        useEffect(() => {
            setValue(_handleDataFormat);
        }, [_handleDataFormat]);

        const peopleLimit: number = props.PeopleLimit !== null ? props.PeopleLimit : 1;
        const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;

        function _handleDataFormat(): string[] {
            if (_fieldActions.isControlled()) {
                return props.Data !== undefined
                    && props.Data !== null
                    && Object.keys(props.Data).length > 0
                    && props.Data[props.FieldName] !== null
                    ? props.Data[props.FieldName] : null;
            } else {
                return Value;
            }
        }

        function _handleOnChange(items: IPersonaProps[]): void {
            const dataObj: any = props.Data;
            const emails: string[] = items.map((item: any) => {
                const tempLoginName: string = item.loginName.replace("i:0#.f|membership|", "");
                if (tempLoginName.indexOf("#ext#") > 0) {
                    return tempLoginName.substring(0, tempLoginName.indexOf("#ext#")).replace("_", "@");
                }
                return tempLoginName;
            });
            setValue(emails);
            if (emails === null) {
                dataObj[props.FieldName] = null;
            } else {
                dataObj[props.FieldName] = emails;
            }
            if (props.onChange !== undefined) {
                props.onChange(undefined, dataObj, props.FieldName);
            }
        }
        let readyOnlyValue: string = "";
        Value.forEach((item => {
            readyOnlyValue += _fieldActions.isReadOnly() && `${item}, `;
        }));
        return (
            <div className={styles.fieldContainer}>
                <FieldLabel
                    Label={props.Label}
                    Required={_fieldActions.isRequired()}
                    UseIcon={_fieldActions.hasIcon()}
                    TipTool={_fieldActions.hasTipTool()}
                    IconName="People"
                />
                {(!_fieldActions.isReadOnly()) ?
                    <PeoplePicker
                        context={props.Context}
                        personSelectionLimit={peopleLimit}
                        defaultSelectedUsers={Value}
                        groupName={props.GroupName}
                        showtooltip={true}
                        disabled={_fieldActions.isDisabled()}
                        onChange={(items) => _handleOnChange(items)}
                        showHiddenInUI={false}
                        principalTypes={[props.PrincipalType !== undefined ? props.PrincipalType : PrincipalType.User]}
                        resolveDelay={1000}
                    //errorMessage={errorMessage}
                    />
                    :
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