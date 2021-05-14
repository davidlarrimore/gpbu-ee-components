import { LightningElement, api, track } from 'lwc';


import getDemoSetupRecruitQuestion from '@salesforce/apex/eeLWCHelper.getRecruitQuestions';


export default class EeFlowRecruitQuestionForm extends LightningElement {
    @api demoSetupId;
    @api recruitQuestions = [];
    @track apiCallCompletedFlag = false;
    @track apiResultsFlag = false; 
    @track demoSetupRecruitQuestions;


    connectedCallback() {
        this.doRefreshComponent(false);
      }

    doRefreshComponent(forcedRefreshFlag) {
        console.log(`Running doRefreshComponent! demoSetupId: ${this.demoSetupId}`);
  
        getDemoSetupRecruitQuestion({demoSetupId: this.demoSetupId})
          .then((data) => {
            console.log(`getDemoSetupRecruitQuestion Success! Response: ${JSON.stringify(data)}`);
  
            this.apiCallCompletedFlag = true;
            if(data.length > 0){
                this.apiResultsFlag = true; 

                this.demoSetupRecruitQuestions = data;
                console.log(`Assigning newRecruitQuestions`);
                let newRecruitQuestions = [];

                console.log(`newRecruitQuestion Mapping Loop`);
                for (let i = 0; i < data.length; i++) {
                    console.log(`Loop #${i} against data:${JSON.stringify(data[i])}`);
                    let newRecord = {};
                    newRecord.Recruit_Answer__c = data[i].Default_Answer__c;
                    newRecord.Name = data[i].Name;
                    newRecord.Answer_Score__c = data[i].Default_Answer_Score__c;    
                    console.log(`newRecord: ${JSON.stringify(newRecord)}`);
               
                    newRecruitQuestions.push(newRecord);
                }
                console.log(`newRecruitQuestions: ${JSON.stringify(newRecruitQuestions)}`);

                this.recruitQuestions = newRecruitQuestions;

                console.log(`recruitQuestions Mapped! ${JSON.stringify(this.recruitQuestions)}`);
            }
  
            this.error = undefined;
          })
          .catch((error) => {
            console.log(`getDemoSetupRecruitQuestion Fail! Response: ${JSON.stringify(error)}`);
            this.error = error;
            this.demoSetupRecruitQuestions = null;
          });
      }



      handleFieldChange(event){
        console.log(`handleFieldChange Triggered`);
        console.log(`Current value of the input: ${event.target.label} - ${event.target.value}`);

        let newRecruitQuestions = [];

        for (let i = 0; i < this.recruitQuestions.length; i++) {
            let newRecord = this.recruitQuestions[i];
            console.log(`Loop #${i} against data:${JSON.stringify(this.recruitQuestions[i])}`);

            if(this.recruitQuestions[i].Name == event.target.label){
                newRecord.Recruit_Answer__c = event.target.value;
            }
       
            newRecruitQuestions.push(newRecord);
        }

        this.recruitQuestions = newRecruitQuestions;

        console.log(`recruitQuestions Mapped! ${JSON.stringify(this.recruitQuestions)}`);
      }

}