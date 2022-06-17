import * as React from 'react';

import styles from '../../common/FormFields.module.scss';

import { ISPChoiceFieldProps, ISPChoiceFieldState, Layout } from ".";
import { FieldActions, FieldLabel } from "../../common";

import { ChoiceGroup, IChoiceGroupOption, Icon, mergeStyles } from '@fluentui/react';

export class SPChoiceField extends React.Component<ISPChoiceFieldProps, ISPChoiceFieldState> {
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

    private handleOnChange = (event: React.FormEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOption) => {
        const { props } = this;
        let FieldsValue = (option ? option.key : null);
        this.setState({ FieldsValue: FieldsValue });
        var DataObj: any = props.Data;
        DataObj[props.FieldName] = FieldsValue;
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
        let _fieldActions: FieldActions = new FieldActions(props);
        const iconClass = mergeStyles({
            fontSize: 20
        });
        const iconCheckedClass = FieldsValue && mergeStyles({
            color: "#0078d4"
        });
        const HorizontalLayout = props.Layout === Layout.Horizontal ? styles.SPChoiceHorizontal : undefined;
        const readonlyChoices = props.Choices.map((choice: IChoiceGroupOption) => {
            return (<div>
                {choice.key === FieldsValue ?
                    <Icon className={mergeStyles(iconClass, iconCheckedClass, styles.fieldIcon)} iconName="RadioBtnOn" /> :
                    <Icon className={mergeStyles(iconClass, iconCheckedClass, styles.fieldIcon)} iconName="RadioBtnOff" />
                }
                {choice.text}
            </div>);
        });

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
                        selectedKey={FieldsValue}
                        className={_fieldActions.getClassNames(HorizontalLayout)}
                        disabled={_fieldActions.isDisabled()}
                        onChange={(event, option) => this.handleOnChange(event, option)}
                    /> :
                    <div className={props.Layout === Layout.Horizontal ?
                        [styles.readOnly, styles.SPHorizontalLayoutReadOnly].join(' ') :
                        styles.readOnly}>
                        {readonlyChoices}
                        <Icon className={mergeStyles(styles.lockIcon, styles.fieldIcon)} iconName={"Lock"} />
                    </div>
                }
            </div>
        );
    }
}