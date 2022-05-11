import * as React from 'react';
import { TextField } from '@fluentui/react';
import styles from '../../common/FormFields.module.scss';
import { FieldActions } from '../../common/FieldActions';
import { FieldLabel } from '../../common/FieldLabel';
import { keyBy } from 'lodash';

export interface ISPTextBoxFieldProps {
    Label: string;
    Data?: any;
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
}

export interface ISPTextBoxFieldState {
    FieldsValue: string;
}

export class SPTextBoxField extends React.Component<ISPTextBoxFieldProps, ISPTextBoxFieldState> {
    constructor(props) {
        super(props);
        this.handleDataFormat = this.handleDataFormat.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            FieldsValue: this.handleDataFormat()
        };
    }

    private handleDataFormat = (): string => {
        return this.props.Data !== undefined ? this.props.Data[this.props.FieldName] : null;
    }

    private handleOnKeyPress = (event) => {
        const { props } = this;
        const { FieldsValue } = this.state;
        if (event.key === "Enter" || event.charCode === 13) {
            var DataObj: any = props.Data;
            if (FieldsValue.length === 0) {
                DataObj[props.FieldName] = null;
            } else {
                DataObj[props.FieldName] = FieldsValue;
            }
            props.onChange(props.FieldName, DataObj);
        }
    }

    private handleOnBlur = () => {
        const { props } = this;
        const { FieldsValue } = this.state;
        var DataObj: any = props.Data;
        if (FieldsValue.length === 0) {
            DataObj[props.FieldName] = null;
        } else {
            DataObj[props.FieldName] = FieldsValue;
        }
        props.onChange(props.FieldName, DataObj);
    }

    private handleOnChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newTextValue?: string) => {
        this.setState({ FieldsValue: (newTextValue ? newTextValue : null) });

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
                />
                <TextField
                    readOnly={_fieldActions.isReadOnly()}
                    disabled={_fieldActions.isDisabled()}
                    className={_fieldActions.getClassNames()}
                    value={FieldsValue}
                    iconProps={iconProps}
                    errorMessage={_fieldActions.getErrorMessage()}
                    onKeyPress={(event) => this.handleOnKeyPress(event)}
                    onBlur={() => this.handleOnBlur()}
                    onChange={(event, value) => this.handleOnChange(event, value)} />
            </div>
        );
    }
}