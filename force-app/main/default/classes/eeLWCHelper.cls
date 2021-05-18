public with sharing class eeLWCHelper {

    @AuraEnabled
    public static ContentDocument getContentDocument(String title) {
        System.debug('Running eeLWCHelper getContentDocument');
        System.debug('title = "' + title + '"');   

        List<ContentDocument> contentDocuments = [SELECT Id, Title, LatestPublishedVersionId FROM ContentDocument WHERE Title = :title];
        if(contentDocuments.size() > 0){
            return contentDocuments[0];
        }

        return null;
     }

     @AuraEnabled
     public static ContentAsset getContentAsset(String contentDocumentId) {
         System.debug('Running eeLWCHelper getContentAsset');
         System.debug('contentDocumentId = "' + contentDocumentId + '"');   
 
         List<ContentAsset> contentAssets = [SELECT Id, DeveloperName FROM ContentAsset WHERE ContentDocumentId = :contentDocumentId];
         if(contentAssets.size() > 0){
             return contentAssets[0];
         }
 
         return null;
      }
 
      @AuraEnabled
      public static ContentAsset getContentAssetFromDocument(String title) {
          System.debug('Running eeLWCHelper getContentAssetFromDocument');
          System.debug('title = "' + title + '"');   
  

          List<ContentDocument> contentDocuments = [SELECT Id, LatestPublishedVersionId FROM ContentDocument WHERE Title = :title];
          if(contentDocuments.size() > 0){
              List<ContentAsset> contentAssets = [SELECT Id, DeveloperName FROM ContentAsset WHERE ContentDocumentId = :contentDocuments[0].Id];
              if(contentAssets.size() > 0){
                  return contentAssets[0];
              }
          }
          return null;
       }

     @AuraEnabled
     public static boolean call5DaysBeforeFlow(String recordId, String flowToRun) {
         System.debug('Running eeOnboardingWidgetHelper call5DaysBeforeFlow');
         System.debug('recordId = "' + recordId + '" and flowToRun = "' + flowToRun + '"');   
 
         Map<String, Object> params = new Map<String, Object>();
         params.put('recordId', recordId);
 
         if(flowToRun == '5DaysBefore'){
             Flow.Interview.New_Hire_Onboarding_Autolaunch_5_Days_Before_Onboarding theFlow = new Flow.Interview.New_Hire_Onboarding_Autolaunch_5_Days_Before_Onboarding(params);
             theFlow.start();
         }else if(flowToRun == 'Orientation'){
             Flow.Interview.New_Hire_Onboarding_Active_Employee_Autolaunch theFlow = new Flow.Interview.New_Hire_Onboarding_Active_Employee_Autolaunch(params);
             theFlow.start();
         }
 
         return true;
      }     


      @AuraEnabled
      public static boolean callConvertRecruitToApplicantFlow(String recordId) {
          System.debug('Running eeHiringRecruitPageWidgetHelper callConvertRecruitToApplicantFlow');
          System.debug('recordId = "' + recordId + '"');   
  
          Map<String, Object> params = new Map<String, Object>();
          params.put('recordId', recordId);
  
          Flow.Interview.Recruit_Autolaunch_Convert_Recruit_to_Applicant theFlow = new Flow.Interview.Recruit_Autolaunch_Convert_Recruit_to_Applicant(params);
          theFlow.start();
  
          return true;
       }


       @AuraEnabled
       public static List<Demo_Setup_Recruit_Question__c> getRecruitQuestions(String demoSetupId) {
           System.debug('Running eeFlowRecruitQuestionFormHelper getRecruitQuestions');
           System.debug('demoSetupId = "' + demoSetupId + '"');   
   
           return [SELECT Id, Default_Answer__c, Name, Demo_Setup_Recruit_Answer_s__c, Default_Answer_Score__c, Order__c FROM Demo_Setup_Recruit_Question__c WHERE Demo_Setup_Name__c = :demoSetupId ORDER BY Order__c ASC];
        }

}
