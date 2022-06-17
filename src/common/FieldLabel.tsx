import * as React from 'react';
import styles from './FormFields.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { Text, ITextProps } from '@fluentui/react/lib/Text';
import { IconButton } from '@fluentui/react/lib/Button';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { concat } from 'lodash';
import { TipToolCallout } from './TipToolCallout';

export interface IFieldLabelProps {
    UseIcon: boolean;
    Label: string;
    Required: boolean;
    TipTool: string;
    IconName?: string;
}

export interface IFieldLabelState {
    isCalloutVisible: boolean;
}

export class FieldLabel extends React.Component<IFieldLabelProps, IFieldLabelState> {
    constructor(props) {
        super(props);
        this.toggleIsCalloutVisible = this.toggleIsCalloutVisible.bind(this);
        this.state = {
            isCalloutVisible: false
        };
    }

    private toggleIsCalloutVisible = () => {
        this.setState({ isCalloutVisible: !this.state.isCalloutVisible });
    }

    public render(): JSX.Element {
        const { props } = this;
        const { isCalloutVisible } = this.state;
        let IconName: string = props.IconName ? props.IconName : "FieldEmpty";

        let containerStyles: string[] = [styles.titleContainer];
        if (props.UseIcon) {
            containerStyles.push(styles.fieldIcon);
        }
        if (props.Required) {
            containerStyles.push(styles.isRequired);
        }
        let className: string = containerStyles.join(" ");
        return (
            <div className={className}>
                <Icon className={styles.fieldIcon} iconName={IconName} />
                <div className={styles.label}>{props.Label}</div>
                {props.TipTool && <TipToolCallout message={props.TipTool} />}
            </div>
        );
    }
}