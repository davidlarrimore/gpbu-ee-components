import { LightningElement } from 'lwc';

import PROCESS_FLOW_TOP from '@salesforce/contentAssetUrl/processflowtoppng';
import PROCESS_FLOW_BOTTOM from '@salesforce/contentAssetUrl/processflowbottompng';

export default class DemoSetupFlowDiagram extends LightningElement {

    processFlowTop = PROCESS_FLOW_TOP;
    processFlowBottom = PROCESS_FLOW_BOTTOM;

}