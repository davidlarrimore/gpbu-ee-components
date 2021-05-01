public with sharing class eeOnboardingWidgetHelper {

    
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

}
