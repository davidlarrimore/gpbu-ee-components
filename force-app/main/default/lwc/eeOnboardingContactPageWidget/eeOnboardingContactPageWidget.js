import { LightningElement, api, wire, track } from 'lwc';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import EMPLOYMENT_STATUS_FIELD from '@salesforce/schema/Contact.Employment_Status__c';
import MANAGER_FLOW_COMPLETE_FIELD from '@salesforce/schema/Contact.New_Hire_Manager_Flow_Complete__c';
import FIVE_DAYS_BEFORE_COMPLETE_FIELD from '@salesforce/schema/Contact.Run_Five_Days_Before_Process__c';

import executeFlow from '@salesforce/apex/eeOnboardingWidgetHelper.call5DaysBeforeFlow';


const FIELDS = [EMPLOYMENT_STATUS_FIELD, MANAGER_FLOW_COMPLETE_FIELD, FIVE_DAYS_BEFORE_COMPLETE_FIELD];

export default class EeOnboardingContactPageWidget extends LightningElement {

    version = "2.7";   
    @api recordId;

    @track pathStage = "Wizard";
    @track contact;
    @track readyFor5DaysBefore = false;
    @track readyForActivation = false;
    @track isActiveEmployee = false;
    
    flowResponse = false;
    error;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS})
    wiredAccount({ error, data }) {
        console.log(`Running getRecord`);
        console.log(`data = ${JSON.stringify(data)}`);
        if (data) {
            this.contact = data;
            this.error = undefined;

            if(data.fields.Employment_Status__c.value == "New-Hire" && data.fields.Run_Five_Days_Before_Process__c.value == false){
                this.pathStage = "Wizard";
                this.readyFor5DaysBefore = true;
            }
    
            if(data.fields.Employment_Status__c.value == "New-Hire" && data.fields.Run_Five_Days_Before_Process__c.value == true){
                this.pathStage = "5DaysBefore";
                this.readyForActivation = true;
            }
    
            if(data.fields.Employment_Status__c.value == "Active"){
                this.pathStage = "Activation";
                this.isActiveEmployee = true;
            }

        } else if (error) {
            this.error = error;
            this.contact = undefined;
        }
    }


    handleClickOne() {
        this.onSubmit("5DaysBefore", 'Progressed to 5 Days Before. Please refresh the page.');
    }

    handleClickTwo() {
        this.onSubmit("Activation", 'Employee Activated. Please refresh the page.');
    }
    

    onSubmit(runThisFlow, FlowDescription) {
        console.log(`Running executeFlow`);
        executeFlow({ recordId: this.recordId, flowToRun: runThisFlow })
        .then((result) => {
            console.log("Running executeFlow");
            if (result) {
                this.flowResponse = result;
                this.error = undefined;

                if(runThisFlow == "5DaysBefore"){
                    this.pathStage = "5DaysBefore";
                }
                if(runThisFlow == "Activation"){
                    this.pathStage = "Activation";
                }

                const evt = new ShowToastEvent({
                    title: 'Time Machine completed successfully',
                    message: FlowDescription,
                    variant: 'success',
                });
                this.dispatchEvent(evt);

            }
        })
        .catch((error) => {
            console.log(
            `executeFlow had an error: ${JSON.stringify(error)}`
            );
            this.error = error;
        });
    }
    
}