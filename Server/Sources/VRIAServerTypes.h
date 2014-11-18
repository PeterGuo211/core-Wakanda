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
#ifndef __RIAServerTypes__
#define __RIAServerTypes__


class VRIAServerProject;

typedef std::vector< XBOX::VRefPtr<VRIAServerProject> >						VectorOfApplication;
typedef std::vector< XBOX::VRefPtr<VRIAServerProject> >::iterator			VectorOfApplication_iter;
typedef std::vector< XBOX::VRefPtr<VRIAServerProject> >::const_iterator		VectorOfApplication_citer;
typedef std::vector< XBOX::VRefPtr<VRIAServerProject> >::reverse_iterator	VectorOfApplication_riter;


enum
{
	eSOM_FOR_RUNNING = 1,
	eSOM_FOR_MAINTENANCE

};
typedef sLONG ESolutionOpeningMode;


enum
{
	ePOM_FOR_RUNNING		= 1,
	ePOM_FOR_MAINTENANCE	= 2,
	ePOM_SANDBOXED			= 4

};
typedef sLONG EProjectOpeningMode;



#endif