import { LightningElement, api, wire, track } from 'lwc';

import { getRecord, getFieldValue, getRecordNotifyChange } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getContentAssetfromDeveloperName from '@salesforce/apex/eeLWCHelper.getContentAssetfromDeveloperName';

import EMPLOYEE_PHOTO_ASSET_FILE_NAME_FIELD from '@salesforce/schema/Demo_Setup__c.Employee_Photo_Asset_File_Name__c';

const FIELDS = [EMPLOYEE_PHOTO_ASSET_FILE_NAME_FIELD];


export default class EeDemoComponentContactImageCard extends LightningElement {
    version = "2.8";   
    @api recordId;

    @track demoSetup;
    @track contentDocument;

    @track apiCallCompletedFlag = false;
    @track apiResultsFlag = false; 

    @track imageURL;
    @track imageName;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS})
    wiredDemoSetup({ error, data }) {
        console.log(`Running getRecord`);
        console.log(`data = ${JSON.stringify(data)}`);
        this.apiCallCompletedFlag = true; 
        if (data && data !== null && data !== undefined) {
            this.demoSetup = data;
            this.error = undefined;
            this.getContentDocumentMethod(data.fields.Employee_Photo_Asset_File_Name__c.value);
        } else if (error) {
            this.apiCallCompletedFlag = true; 
            console.log(`Error: ${error}`);
            this.error = error;
            this.demoSetup = undefined;
        }
    }

    getContentDocumentMethod(docDeveloperName){
        this.apiCallCompletedFlag = false; 
        getContentAssetfromDeveloperName({ developerName: docDeveloperName })
        .then((data) => {
            this.apiCallCompletedFlag = true;

            if (data && data !== null && data !== undefined) {
                console.log(
                    `getContentDocumentMethod.getContentAssetfromDeveloperName Completed Successfully: ${JSON.stringify(data)}`
                );
                this.apiResultsFlag = true;
                this.contentDocument = data;

                this.imageURL = `/file-asset-public/${data.DeveloperName}`;
                this.imageName = docTitle;

                this.error = undefined;
            }else{
                console.log(
                    `getContentDocumentMethod.getContentAssetfromDeveloperName Completed Successfully, but had no data`
                );                
            }
        })
        .catch((error) => {
          this.apiCallCompletedFlag = true; 
          this.error = error;
          console.log(
            `getContentDocumentMethod.getContentDocument Failed: ${JSON.stringify(error)}`
          );
        });       
    }
}