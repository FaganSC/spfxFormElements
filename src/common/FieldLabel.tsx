import * as React from 'react';
import styles from './FormFields.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { Text, ITextProps } from '@fluentui/react/lib/Text';
import { IconButton } from '@fluentui/react/lib/Button';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { concat } from 'lodash';

export interface IFieldLabelProps {
    UseIcon: boolean;
    Label: string;
    Required: boolean;
    TipTool: string;
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
        let containerStyles: string[] = [styles.titleContainer];
        if (props.UseIcon) {
            containerStyles.push(styles.fieldIcon);
        }
        let className : string = containerStyles.join(" ");
        return (
            <div className={className}>
                <Icon className={styles.fieldIcon} iconName={"TextField"} />
                <div className={styles.label}>{props.Label}</div>
                {props.Required ? <span className={styles.isRequired}>*</span> : undefined}
                {props.TipTool ? <>
                    <IconButton className={styles.tipTool} iconProps={{ iconName: 'Info' }} onClick={() => this.toggleIsCalloutVisible()} />
                    {isCalloutVisible ? (
                        <Callout
                            //ariaLabelledBy={labelId}
                            //ariaDescribedBy={descriptionId}
                            role="dialog"
                            className={styles.callout}
                            //gapSpace={gapSpace}
                            //target={`#${buttonId}`}
                            isBeakVisible={true}
                            beakWidth={10}
                            onDismiss={this.toggleIsCalloutVisible}
                            directionalHint={DirectionalHint.bottomRightEdge}
                            setInitialFocus
                        >
                            <Text block variant="medium">
                                {props.TipTool}
                            </Text>

                        </Callout>
                    ) : null}
                </> : undefined}
            </div>
        );
    }
}