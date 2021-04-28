public with sharing class eeFlowRecruitQuestionFormHelper {


    @AuraEnabled
    public static List<Demo_Setup_Recruit_Question__c> getRecruitQuestions(String demoSetupId) {
        System.debug('Running eeFlowRecruitQuestionFormHelper getRecruitQuestions');
        System.debug('demoSetupId = "' + demoSetupId + '"');   

        return [SELECT Id, Default_Answer__c, Name, Demo_Setup_Recruit_Answer_s__c, Default_Answer_Score__c, Order__c FROM Demo_Setup_Recruit_Question__c WHERE Demo_Setup_Name__c = :demoSetupId ORDER BY Order__c ASC];
     }

}
