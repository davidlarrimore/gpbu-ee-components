public with sharing class eeHiringRecruitPageWidgetHelper {



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
}
