echo "*** Creating scratch org from Org Shape ..."
sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias eeScratch -d 30

echo "*** Pushing metadata to scratch org ..."
sfdx force:source:push

#echo "*** Assigning permission set to your user ..."
#sfdx force:user:permset:assign --permsetname LFO_Demo

echo "*** Generating password for your user ..."
sfdx force:user:password:generate --targetusername eeScratch

echo "*** Setting up debug mode..."
sfdx force:apex:execute -f scripts/apex/setDebugMode.apex

#echo "*** Setting up Remote Site Settings..."
#sfdx force:apex:execute -f scripts/apex/createRemoteSiteSettings.apex

echo "*** Opening Org"
sfdx force:org:open