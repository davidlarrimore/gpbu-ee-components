import { LightningElement, api, wire, track } from 'lwc';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import LEAD_STATUS_FIELD from '@salesforce/schema/Lead.Status';

import executeFlow from '@salesforce/apex/eeHiringRecruitPageWidgetHelper.callConvertRecruitToApplicantFlow';

const FIELDS = [LEAD_STATUS_FIELD];


export default class EeHiringRecruitPageWidget extends LightningElement {

    version = "2.3";   
    @api recordId;

    @track pathStage = "New";
    @track lead;
    @track readyforConvert = false;
        
    @track apiCallCompletedFlag = false;
    @track apiResultsFlag = false; 


    flowResponse = false;
    error;


    @wire(getRecord, { recordId: '$recordId', fields: FIELDS})
    wiredAccount({ error, data }) {
        console.log(`Running getRecord`);
        this.apiCallCompletedFlag = true;
        console.log(`data = ${JSON.stringify(data)}`);
        if (data) {
            this.contact = data;
            this.error = undefined;

            if(data.fields.Status.value == "New"){
                this.pathStage = "New";
            }

            if(data.fields.Status.value == "Active"){
                this.pathStage = "Active";
                this.readyforConvert = true;
            }

            if(data.fields.Status.value == "Applied"){
                this.pathStage = "Applied";
            }

        } else if (error) {
            this.apiCallCompletedFlag = true;
            this.error = error;
            this.contact = undefined;
        }
    }


    handleClick() {
        this.apiCallCompletedFlag = false;
        console.log(`Running executeFlow`);
        executeFlow({ recordId: this.recordId})
        .then((result) => {
            console.log("Running executeFlow");
            if (result) {
                this.flowResponse = result;
                this.apiCallCompletedFlag = true;
                this.error = undefined;
                this.readyforConvert = false;

                this.pathStage = "Applied";

                const evt = new ShowToastEvent({
                    title: 'Time Machine completed successfully',
                    message: 'Recruit has Applied for a position. and been marked as Applied.',
                    variant: 'success',
                });
                this.dispatchEvent(evt);

            }
        })
        .catch((error) => {
            this.apiCallCompletedFlag = true;
            console.log(
            `executeFlow had an error: ${JSON.stringify(error)}`
            );
            this.error = error;
        });
    }

}