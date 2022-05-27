import { IDemoModel } from "./DemoModel";
export interface IDemoState {
    testRequired: boolean;
    testDisabled: boolean;
    testReadOnly: boolean;
    testIcon: boolean;
    testDefaultData: boolean;
    testTipTool: boolean;
    testTipToolMsg?: string;
    
    testData: IDemoModel;
  }
  