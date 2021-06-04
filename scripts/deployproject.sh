
echo "*** Run Test Cases W\Coverage ..."
//sfdx force:apex:test:run -c -u ee -r human

#No Longer Needed
#echo "*** Creating Managed Package ..."
sfdx force:package:create -n "gPBU Employee Experience Components" -t Unlocked --nonamespace -r force-app --targetdevhubusername ee

echo "*** Creating Managed Package Version..."
sfdx force:package:version:create --package "gPBU Employee Experience Components" -x --wait 10 --codecoverage  --definitionfile config/project-scratch-def.json

echo "*** Promoting Latest Managed Package ..."
sfdx force:package:version:promote -p $(sfdx force:package:version:list -p 'gPBU Employee Experience Components' -o CreatedDate --concise | tail -1 | awk '{print $3}')