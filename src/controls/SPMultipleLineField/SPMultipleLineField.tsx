import * as React from 'react';
import styles from '../../common/FormFields.module.scss';

import { ISPMultipleLineFieldProps, ISPMultipleLineFieldState } from ".";
import { FieldActions, FieldLabel } from "../../common";

import { TextField } from '@fluentui/react/lib/TextField';

export class SPMultipleLineField extends React.Component<ISPMultipleLineFieldProps, ISPMultipleLineFieldState> {
    constructor(props) {
        super(props);
        this.handleDataFormat = this.handleDataFormat.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            FieldsValue: this.handleDataFormat()
        };
    }

    private handleDataFormat = (): string => {
        return this.props.Data !== undefined
            && this.props.Data !== null
            && Object.keys(this.props.Data).length > 0
            && this.props.Data[this.props.FieldName] !== null
            ? this.props.Data[this.props.FieldName] : null;
    }

    private handleOnChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newTextValue?: string) => {
        const { props } = this;
        let FieldsValue = (newTextValue ? newTextValue : null);
        this.setState({ FieldsValue: FieldsValue });
        var DataObj: any = props.Data;
        if (FieldsValue.length === 0) {
            DataObj[props.FieldName] = null;
        } else {
            DataObj[props.FieldName] = FieldsValue;
        }
        props.onChange(props.FieldName, DataObj);
    }

    public componentDidMount = () => {
        //alert('Load');
    }

    public componentWillUnmount = () => {
        //alert('Unload');
    }

    public componentDidUpdate = (prevProps) => {
        if(this.props.Data[this.props.FieldName] !== prevProps.Data[this.props.FieldName]){
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
                    IconName="TextField"
                />
                <TextField
                    readOnly={_fieldActions.isReadOnly()}
                    disabled={_fieldActions.isDisabled()}
                    className={_fieldActions.getClassNames()}
                    multiline={true}
                    value={FieldsValue}
                    iconProps={iconProps}
                    errorMessage={_fieldActions.getErrorMessage()}
                    onChange={(event, value) => this.handleOnChange(event, value)} />
            </div>
        );
    }
}