import * as React from 'react';
import styles from '../../common/FormFields.module.scss';

import { ISPPercentageFieldProps, ISPPercentageFieldState } from ".";
import { FieldActions, FieldLabel } from "../../common";

import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { TextField } from '@fluentui/react/lib/components/TextField/TextField';

export class SPPercentageField extends React.Component<ISPPercentageFieldProps, ISPPercentageFieldState> {
    constructor(props) {
        super(props);
        this.handleDataFormat = this.handleDataFormat.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            FieldsValue: this.handleDataFormat()
        };
    }

    private handleDataFormat = (): NumberFormatValues => {
        const { props } = this;
        let _fieldActions: FieldActions = new FieldActions(props);
        return props.Data !== undefined
            && props.Data !== null
            && Object.keys(props.Data).length > 0
            && props.Data[props.FieldName] !== null
            ? {
                formattedValue: (parseFloat(props.Data[props.FieldName]) * 100).toFixed(_fieldActions.getDecimalScale()) + " %",
                value: (parseFloat(props.Data[props.FieldName]) * 100).toFixed(_fieldActions.getDecimalScale()),
                floatValue: parseFloat(props.Data[props.FieldName]) * 100
            }
            : {
                formattedValue: "",
                value: "",
                floatValue: undefined
            };
    }

    private handleOnChange = (value: NumberFormatValues) => {
        const { props } = this;
        let FieldsValue = (value ? value : null);
        this.setState({ FieldsValue: FieldsValue });
        var DataObj: any = props.Data;
        if (FieldsValue.value.length === 0) {
            DataObj[props.FieldName] = null;
        } else {
            DataObj[props.FieldName] = parseFloat(FieldsValue.value) / 100;
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
                    IconName="CalculatorPercentage"
                />
                {!(_fieldActions.isReadOnly()) && !(_fieldActions.isDisabled()) ?
                    <div className={styles.spfxTextField}>
                        <div className={styles.wrapper}>
                            <div className={styles.fieldGroup}>
                                <NumberFormat
                                    className={styles.field}
                                    value={FieldsValue.value}
                                    decimalScale={_fieldActions.getDecimalScale()}
                                    onValueChange={(value) => this.handleOnChange(value)}
                                />
                                <div className={styles.prefix}>
                                    <span>%</span>
                                </div>
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

