import * as React from 'react';

import styles from '../../common/FormFields.module.scss';

import { ISPPhoneNumberFieldProps, ISPPhoneNumberFieldState } from ".";
import { FieldActions, FieldLabel } from "../../common";

import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { TextField } from '@fluentui/react/lib/components/TextField/TextField';

export class SPPhoneNumberField extends React.Component<ISPPhoneNumberFieldProps, ISPPhoneNumberFieldState> {
    constructor(props) {
        super(props);
        this.handleDataFormat = this.handleDataFormat.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            FieldsValue: this.handleDataFormat()
        };
    }

    private handleDataFormat = (): NumberFormatValues => {
        return this.props.Data !== undefined
            && this.props.Data !== null
            && Object.keys(this.props.Data).length > 0
            && this.props.Data[this.props.FieldName] !== null
            ? {
                formattedValue: this.props.Data[this.props.FieldName], 
                value: this.props.Data[this.props.FieldName],
                floatValue: undefined
              }
             : {
                formattedValue: "", 
                value: "",
                floatValue: undefined
              };
    }

    private handleOnChange = (value:NumberFormatValues) => {
        const { props } = this;
        let FieldsValue = (value ? value : null);
        this.setState({ FieldsValue: FieldsValue });
        var DataObj: any = props.Data;
        if (FieldsValue.formattedValue.length === 0 || FieldsValue.formattedValue === "(___) ___-____") {
            DataObj[props.FieldName] = null;
        } else {
            DataObj[props.FieldName] = FieldsValue.formattedValue;
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
        if (this.props.Data[this.props.FieldName] !== prevProps.Data[this.props.FieldName]) {
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
                    IconName="DeclineCall"
                />
                {!(_fieldActions.isReadOnly()) && !(_fieldActions.isDisabled()) ?
                    <div className={styles.spfxTextField}>
                        <div className={styles.wrapper}>
                            <div className={styles.fieldGroup}>
                                <NumberFormat
                                    className={styles.field}
                                    value={FieldsValue.formattedValue}
                                    allowEmptyFormatting={true}
                                    format="(###) ###-####"
                                    mask="_"
                                    onValueChange={(value) => this.handleOnChange(value)}
                                />
                            </div>
                        </div>
                    </div>
                    : <TextField
                        readOnly={_fieldActions.isReadOnly()}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        value={FieldsValue.formattedValue}
                        iconProps={iconProps}
                    />
                }
            </div>
        );
    }
}