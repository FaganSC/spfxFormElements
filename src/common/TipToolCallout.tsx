import * as React from 'react';
import { Callout, /*mergeStyleSets, FontWeights,*/ IconButton, DirectionalHint } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import styles from './FormFields.module.scss';
export interface ITipToolCalloutProps {
  message: string;
}

export function TipToolCallout(props: ITipToolCalloutProps): JSX.Element {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');

  return (
    <>
      <IconButton id={buttonId} className={styles.tipTool} iconProps={{ iconName: 'Info' }} onClick={() => toggleIsCalloutVisible()} />
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          role="dialog"
          gapSpace={0}
          target={`#${buttonId}`}
          isBeakVisible={true}
          beakWidth={10}
          onDismiss={toggleIsCalloutVisible}
          directionalHint={DirectionalHint.bottomRightEdge}
          setInitialFocus
        >
          {props.message}
        </Callout>
      )}
    </>
  );
}
/*
const styles2 = mergeStyleSets({
  button: {
    width: 130,
  },
  callout: {
    width: 320,
    maxWidth: '90%',
    padding: '20px 24px',
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: 'block',
    marginTop: 20,
  },
});
*/