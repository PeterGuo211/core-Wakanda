/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/

#include "headers4d.h"
#include "testLDAPComponent.h"
#include "LDAPComponent/CLDAPComponent.h"
#include "LDAPComponent/Interfaces/ILDAPClient.h"

USING_TOOLBOX_NAMESPACE
VJSONObject* testLDAP::sParams = NULL;

void testLDAP::Init()
{
	DebugMsg("\n-------------------------------------------------\n");
	DebugMsg("\n-----------    TEST LDAP COMPONT   --------------\n");
	DebugMsg("\n-------------------------------------------------\n");
	VError err = VE_OK;

	VJSONValue param;

	VFolder *folder = VProcess::Get()->RetainFolder(VProcess::eFS_Executable);

	VFile paramsFile(*folder, CVSTR("params.json"));


	err = VJSONImporter::ParseFile(&paramsFile, param);

	if (err == VE_OK)
	{
		CopyRefCountable<VJSONObject >(&sParams, param.GetObject());
		
	}


}

void testLDAP::TestLDAPComponentBind()
{
	CLDAPComponent* ldap = (CLDAPComponent*)(VComponentManager::RetainComponent('LDAP'));
	VJSONObject* params = NULL;
	
	if (sParams != NULL)
	{
		params = sParams->GetProperty("bind").GetObject();

		ILDAPClient* client = ldap->CreateClient(params);
		DebugMsg("------------------- LDAP TEST BIND ------------------\n");
		if (client != NULL)
		{

			DebugMsg("Bind Success.. \n");

		}
		else
		{
			DebugMsg("Bind Failed.. \n");
		}
		DebugMsg("\n-------------------------------------------------\n");
		fflush(stderr);
		
		ReleaseRefCountable(&params);
	}
	ReleaseRefCountable(&ldap);
	
}

VJSONObject*  readParams()
{
	VJSONObject* params = new VJSONObject();
	FILE* file = fopen("params.in", "r");
	if (file != NULL)
	{
		char line[255];
		fscanf(file, "hostname=%s\n", line);
		printf("%s\n",line);
		params->SetProperty("hostname", VJSONValue(line));
		fscanf(file, "userDN=%s\n", line);
		printf("%s\n",line);
		params->SetProperty("userDN", VJSONValue(line));
		fscanf(file, "password=%s\n", line);
		printf("%s\n",line);
		params->SetProperty("password", VJSONValue(line));
		fscanf(file, "port=%s\n", line);
		printf("%s\n",line);
		params->SetProperty("port", VJSONValue(atoi(line)));
		fscanf(file, "dn=%s\n", line);
		//printf("%s\n",line);
		params->SetProperty("dn", VJSONValue(line));
		fscanf(file, "attribute=%s\n", line);
		//printf("%s\n",line);
		params->SetProperty("attribute", VJSONValue(line));
		fscanf(file, "value=%s\n", line);
		//printf("%s\n",line);
		params->SetProperty("value", VJSONValue(line));
	}
	else
	{
		printf("File not Found");
	}
	return params;
}


void  testLDAPComponentAll()
{
	CLDAPComponent* ldap = (CLDAPComponent*)(VComponentManager::RetainComponent('LDAP'));


	VJSONObject* params = readParams();

	VString dnSearch, attr, value;
	params->GetPropertyAsString("dn", dnSearch);
	params->GetPropertyAsString("attribute", attr);
	params->GetPropertyAsString("value", value);

	bool result = false;

	ILDAPClient* client = ldap->CreateClient(params);

	
	DebugMsg("\n-------------------------------------------------\n");
	DebugMsg("\n-----------    TEST LDAP COMPONT   --------------\n");
	DebugMsg("\n-------------------------------------------------\n");

	//test comparaison
	DebugMsg("\n-------------------------------------------------\n");
	if (client != NULL)
	{

		DebugMsg("Success.. \n");
		client->Compare(dnSearch, attr, value, result);
		if (result)
		{
			DebugMsg("Comparaison Successed: Attribute %V have value %V", &attr, &value);
		}
		else
		{
			DebugMsg("Comparaison Failed: Attribute %V have not value %V", &attr, &value);
		}
		
	}
	else
	{
		DebugMsg("Failed.. \n");
	}
	DebugMsg("\n-------------------------------------------------\n");
	fflush(stderr);

	//test CHeck Password
	DebugMsg("\n-------------------------------------------------\n");
	DebugMsg("\n---------------CHECK Password --------------------\n");
	if (client != NULL)
	{

		result = false;
		VError err = client->CheckPassword("CN=administrator,CN=Users,DC=LDAPTest,DC=local", "wakanda.-000", result);
		DebugMsg("\nCheck Status %d\n", result);
	}
	printf("\n-------------------------------------------------\n");
	fflush(stderr);


	ReleaseRefCountable(&ldap);
	ReleaseRefCountable(&params);
	

}

void testLDAP::TestLDAPComponentCompare()
{
	CLDAPComponent* ldap = (CLDAPComponent*)(VComponentManager::RetainComponent('LDAP'));


	VJSONObject* params = sParams->GetProperty("compare").GetObject();
	VJSONObject* paramsBind = sParams->GetProperty("bind").GetObject();

	VString dnSearch, attr, value;
	params->GetPropertyAsString("dn", dnSearch);
	params->GetPropertyAsString("attribute", attr);
	params->GetPropertyAsString("value", value);

	bool result = false;

	ILDAPClient* client = ldap->CreateClient(paramsBind);

	//test comparaison
	DebugMsg("\n--------------- Test Compare --------------------\n");
	if (client != NULL)
	{

		client->Compare(dnSearch, attr, value, result);
		if (result)
		{
			DebugMsg("Comparaison Successed: Attribute %V have value %V", &attr, &value);
		}
		else
		{
			DebugMsg("Comparaison Failed: Attribute %V have not value %V", &attr, &value);
		}

	}
	else
	{
		DebugMsg("Bind Failed.. \n");
	}
	DebugMsg("\n-------------------------------------------------\n");
	fflush(stderr);

	ReleaseRefCountable(&ldap);
	ReleaseRefCountable(&params);
	ReleaseRefCountable(&paramsBind);
}

void testLDAP::TestLDAPComponentCheckPassword()
{
	CLDAPComponent* ldap = (CLDAPComponent*)(VComponentManager::RetainComponent('LDAP'));


	VJSONObject* params = sParams->GetProperty("checkpassword").GetObject();
	VJSONObject* paramsBind = sParams->GetProperty("bind").GetObject();

	VString dn, password;
	params->GetPropertyAsString("dn", dn);
	params->GetPropertyAsString("password", password);
	
	bool result = false;

	ILDAPClient* client = ldap->CreateClient(paramsBind);

	DebugMsg("\n---------------CHECK Password --------------------\n");
	if (client != NULL)
	{

		result = false;
		VError err = client->CheckPassword(dn, password, result);
		if (result)
		{
			DebugMsg(" Correct password %V for user %V", &password, &dn);
		}
		else
		{
			DebugMsg(" Invalid password %V for user %V", &password, &dn);
		}
	}
	DebugMsg("\n-------------------------------------------------\n");
	fflush(stderr);

	ReleaseRefCountable(&ldap);
	ReleaseRefCountable(&params);
	ReleaseRefCountable(&paramsBind);

}