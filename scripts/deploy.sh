echo "*** Deploying metadata to target org ..."
sfdx force:source:deploy --targetusername ee --sourcepath force-app

echo "*** Setting up Remote Site Settings ..."
#sfdx force:apex:execute -f scripts/apex/createRemoteSiteSettings.apex -u uscis-outlook-lwc