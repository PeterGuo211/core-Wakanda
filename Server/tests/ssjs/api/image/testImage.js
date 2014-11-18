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
/*
var appPath = application.getFolder("path"),
    imagesFolder = Folder(appPath + 'images'),
*/
function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}
var arrayCommon = ["jpg", "bmp", "gif", "png", "tif", "svg", "raw"];
	arrayJPEG = ["jpg", "jif", "jpeg", "jpe"], arrayPNG = ["png"], arrayBMP = ["bmp", "dib", "rle"], arrayGIF = ["gif"], arrayTIFF = ["tif", "tiff"], arrayWMetaFile = ["emf"], //Win only 
	arrayPDF = ["pdf"], //MacOS only
	arraySVG = ["svg"], arrayResolution = [320240, 640480, 800600, 1024768, 1152864, 12801024, 1280854, 1440900, 16001200], i = 0;
var testCase = {
	name: "test API image",
	_should: {
		error: {},
		ignore: {}
	},	
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {
		//imagesFolder.create();
		if (os.isWindows) {
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFileSource320240JPEG_893 = true, //Crash of test
					this._should.ignore.testImage_MethodSethPathExist_8 = true,
					this._should.ignore.testImage_SaveAPictureWithASetNewPath_1006 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768RAW_140 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864RAW_176 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024RAW_248 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854RAW_212 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage1440900SVG_285 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200RAW_320 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240RAW_35 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480RAW_69 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600RAW_105 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240RAW_861 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240RAW_789 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240JPG2000_677 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240RAW_681 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240SVG_663 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240JPG2000_713 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240RAW_717 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240SVG_699 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage1024768RAW_141 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage12801024RAW_247 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage1280854RAW_211 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage1440900RAW_283 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage16001200RAW_319 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage320240RAW_36 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage640480RAW_68 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage800600RAW_104 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240RAW_862 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240RAW_790 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240JPG2000_678 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240RAW_682 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240SVG_664 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240JPG2000_714 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240RAW_718 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240SVG_700 = true,
					this._should.ignore.testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyCenteredMode_1003 = true,
					this._should.ignore.testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyMode_1002 = true
				} else if (os.isLinux) {
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFileSource320240JPEG_893 = true, //Crash of test
					this._should.ignore.testImage_MethodSethPathExist_8 = true,
					this._should.ignore.testImage_NumberOfPropertiesObjectImage_11 = true,
					this._should.ignore.testImage_ImageObjectWidthMiscImageTest_12 = true, 
					this._should.ignore.testImage_ImageObjectHeightMiscImageTest_13 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240SVG_663 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240SVG_664 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240BMP16bits_665 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240BMP16bits_666 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240BMP24bits_667 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240BMP24bits_668 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240BMP32bits_669 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240BMP32bits_670 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240BMP24bits_OS2_671 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240BMP24bits_OS2_672 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240GIF_673 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240GIF_674 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240JPEG_675 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240JPEG_676 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240JPG2000_677 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240JPG2000_678 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240PNG_679 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240PNG_680 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240RAW_681 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240RAW_682 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFWCMAC_683 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFWCMAC_684 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFWCPC_685 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFWCPC_686 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFLZWPC_687 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFLZWPC_688 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFLZWMAC_689 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFLZWMAC_690 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFZIPMAC_691 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFZIPMAC_692 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFZIPPC_693 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFZIPPC_694 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFJPEGJPEGPC_695 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFJPEGPC_696 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240TIFJPEGJPEGMAC_697 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240TIFJPEGMAC_698 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240SVG_699 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240SVG_700 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240BMP16bits_701 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240BMP16bits_702 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240BMP24bits_703 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240BMP24bits_704 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240BMP32bits_705 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240BMP32bits_706 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240BMP24bits_OS2_707 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240BMP24bits_OS2_708 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240GIF_709 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240GIF_710 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240JPEG_711 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240JPEG_712 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240JPG2000_713 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240JPG2000_714 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240PNG_715 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240PNG_716 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240RAW_717 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240RAW_718 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFWCMAC_719 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFWCMAC_720 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFWCPC_721 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFWCPC_722 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFLZWPC_723 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFLZWPC_724 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFLZWMAC_725 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFLZWMAC_726 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFZIPMAC_727 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFZIPMAC_728 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFZIPPC_729 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFZIPPC_730 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFJPEGJPEGPC_731 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFJPEGPC_732 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240TIFJPEGJPEGMAC_733 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240TIFJPEGMAC_734 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckSize320240GIF_745 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240GIF_781 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckLength320240GIF_817 = true, 
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240GIF_853 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFApertureValue320240JPEG_879 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFBrightnessValue320240JPEG_880 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFColorSpace320240JPEG_881 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFComponentsConfiguration320240JPEG_882 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFContrast320240JPEG_883 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFCustomRendered320240JPEG_884 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFDateTimeDigitized320240JPEG_885 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFDateTimeOriginal320240JPEG_886 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFDigitalZoomRatio320240JPEG_887 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExifVersion320240JPEG_888 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureBiasValue320240JPEG_889 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureIndex320240JPEG_890 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureMode320240JPEG_891 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureTime320240JPEG_892 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFileSource320240JPEG_893 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFlash320240JPEG_894 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFlashEnergy320240JPEG_895 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFlashPixVersion320240JPEG_896 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFNumber320240JPEG_897 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalLength320240JPEG_898 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalLenIn35mmFilm320240JPEG_899 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalPlaneResolutionUnit320240JPEG_900 = true, 
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalPlaneXResolution320240JPEG_901 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalPlaneYResolution320240JPEG_902 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFGainControl320240JPEG_903 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFImageUniqueID320240JPEG_904 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFISOSpeedRatings320240JPEG_905 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFLightSource320240JPEG_906 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFMakerNote320240JPEG_907 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFMaxApertureValue320240JPEG_908 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFMeteringMode320240JPEG_909 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFPixelXDimension320240JPEG_910 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFPixelYDimension320240JPEG_911 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFRelatedSoundFile320240JPEG_912 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSaturation320240JPEG_913 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSceneCaptureType320240JPEG_914 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSceneType320240JPEG_915 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSensingMethod320240JPEG_916 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSharpness320240JPEG_917 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFShutterSpeedValue320240JPEG_918 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSpectralSensitivity320240JPEG_919 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectArea320240JPEG_920 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectDistance320240JPEG_921 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectDistRange320240JPEG_922 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectLocation320240JPEG_923 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFUserComment320240JPEG_924 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFWhiteBalance320240JPEG_925 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCByline320240JPEG_926 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCBylineTitle320240JPEG_927 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCaptionAbstract320240JPEG_928 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCategory320240JPEG_929 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCity320240JPEG_930 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContact320240JPEG_931 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContentLocationCode320240JPEG_932 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContentLocationName320240JPEG_933 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCredit320240JPEG_934 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCDateTimeCreated320240JPEG_935 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCDigitalCreationDateTime320240JPEG_936 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCExpirationDateTime320240JPEG_937 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCFixtureIdentifier320240JPEG_938 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCHeadline320240JPEG_939 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCKeywords320240JPEG_940 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCLanguageIdentifier320240JPEG_941 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCObjectAttributeReference320240JPEG_942 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCObjectName320240JPEG_943 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCOriginalTransmissionReference320240JPEG_944 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCOriginatingProgram320240JPEG_945 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCProgramVersion320240JPEG_946 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCProvinceState320240JPEG_947 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCReleaseDateTime320240JPEG_948 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCScene320240JPEG_949 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSource320240JPEG_950 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSource320240JPEG_951 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSpecialInstructions320240JPEG_952 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCStarRating320240JPEG_953 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSubjectReference320240JPEG_954 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSubLocation320240JPEG_955 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSupplementalCategory320240JPEG_956 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCUrgency320240JPEG_957 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCWriterEditor320240JPEG_958 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFArtist320240JPEG_959 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFCopyright320240JPEG_960 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFDateTime320240JPEG_961 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFDocumentName320240JPEG_962 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFHostComputer320240JPEG_963 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFImageDescription320240JPEG_964 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFMake320240JPEG_965 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFModel320240JPEG_966 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFOrientation320240JPEG_967 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFPhotometricInterpretation320240JPEG_968 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFResolutionUnit320240JPEG_969 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFSoftware320240JPEG_970 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFXResolution320240JPEG_971 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFYResolution320240JPEG_972 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSAltitude320240JPEG_973 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSAltitudeRef320240JPEG_974 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSAreaInformation320240JPEG_975 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDateTime320240JPEG_976 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestBearing320240JPEG_977 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestDistance320240JPEG_978 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestLatitude320240JPEG_979 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestLongitude320240JPEG_980 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDifferential320240JPEG_981 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDOP320240JPEG_982 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSImgDirection320240JPEG_983 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSImgDirectionRef320240JPEG_984 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSLatitude320240JPEG_985 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSLongitude320240JPEG_986 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSMapDatum320240JPEG_987 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSMeasureMode320240JPEG_988 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSProcessingMethod320240JPEG_989 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSSatellites320240JPEG_990 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSSpeed320240JPEG_991 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSSpeedRef320240JPEG_992 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSStatus320240JPEG_993 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSTrack320240JPEG_994 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSTrack320240JPEG_995 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageNewMetaFormatIPTCKeyword320240JPEG_996 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageNewMetaFormatEXIFApertureValue320240JPEG_997 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageNewMetaFormatGPSAltitude320240JPEG_998 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageNewMetaFormatTIFFArtist320240JPEG_999 = true,
					this._should.ignore.testImage_SaveImageManipulatedLocallyAsThumbnailDefaultMode_1000 = true,
					this._should.ignore.testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitMode_1001 = true,
					this._should.ignore.testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyMode_1002 = true,
					this._should.ignore.testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyCenteredMode_1003 = true,
					this._should.ignore.testImage_SaveImageOnDiskLogic1_1004 = true,
					this._should.ignore.testImage_SaveImageOnDiskLogic2_1005 = true,
					this._should.ignore.testImage_SaveAPictureWithASetNewPath_1006 = true
				} else {
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFileSource320240JPEG_893 = true //Crash of test
					this._should.ignore.testImage_MethodSethPathExist_8 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage320240RAW_35 = true, 
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage320240RAW_36 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage640480RAW_68 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage640480RAW_69 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage800600RAW_104 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage800600RAW_105 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage1024768RAW_140 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage1024768RAW_141 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage1152864RAW_176 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage1280854RAW_211 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage1280854RAW_212 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage12801024RAW_247 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage12801024RAW_248 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage1440900RAW_283 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage1440900SVG_285 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImage16001200RAW_319 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImage16001200RAW_320 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240SVG_663 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240SVG_664 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckWidthHeight320240RAW_681 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckWidthHeight320240RAW_682 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240SVG_699 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240SVG_700 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithoutLoadImageCheckWidthHeight320240RAW_717 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithoutLoadImageCheckWidthHeight320240RAW_718 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckSize320240RAW_789 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckSize320240RAW_790 = true,
					this._should.ignore.testImage_SaveImageAsEntityAbsolutePathWithLoadImageCheckLength320240RAW_861 = true,
					this._should.ignore.testImage_SaveImageAsEntityFileObjectWithLoadImageCheckLength320240RAW_862 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFGainControl320240JPEG_903 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFISOSpeedRatings320240JPEG_905 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSceneType320240JPEG_915 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectLocation320240JPEG_923 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContact320240JPEG_931 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCExpirationDateTime320240JPEG_937 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCObjectAttributeReference320240JPEG_942 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCReleaseDateTime320240JPEG_948 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCScene320240JPEG_949 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCStarRating320240JPEG_953 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSubjectReference320240JPEG_954 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFDocumentName320240JPEG_962 = true,
					this._should.ignore.testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFHostComputer320240JPEG_963 = true,
					this._should.ignore.testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyMode_1002 = true,
					this._should.ignore.testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyCenteredMode_1003 = true,
					this._should.ignore.testImage_SaveAPictureWithASetNewPath_1006 = true

			}
	},
	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown: function() {
		/*
		 *	ds.Image.remove();
		 *	ds.ImageWithLoadImage.remove();
		 *	ds.ImageWithoutLoadImage.remove();
		 */
		i++;
	},
	/*
	 *
	 * Test methods for API SSJS IMAGE
	 *
	 */
	// 0 --**-- Object image exist
	testImage_ObjectImageExist_0: function() {
		var thepath = getFolder("path"),
			img = loadImage(thepath + "images/misc/1.png");
		var result = typeof img;
		Y.Assert.areSame("object", result);
	},
	// 1 --**-- Property height exist 
	testImage_PropertyHeightExist_1: function() {
		var thepath = getFolder("path"),
			img = loadImage(thepath + "images/misc/1.png");
		var result = typeof img.height;
		Y.Assert.areSame("number", result);
	},
	// 2 --**-- Property length exist 
	testImage_PropertyLengthExist_2: function() {
		var thepath = getFolder("path"),
			img = loadImage(thepath + "images/misc/1.png");
		var result = typeof img.length;
		Y.Assert.areSame("number", result);
	},
	// 3 --**-- Object meta exist
	testImage_ObjectMetaExist_3: function() {
		var thepath = getFolder("path"),
			e,
			img = loadImage(thepath + "images/misc/1.png");
		try 
		{
			var result = img.meta; //Why img.meta generate an exception?
		}
		catch(e)
		{
			console.log(e);
		}
		if (os.isLinux)
			Y.Assert.areSame(undefined, result); // not developed as yet
		else
			Y.Assert.areSame("object", typeof result);
	},
	// 4 --**-- Property size exist 	
	testImage_PropertySizeExist_4: function() {
		var thepath = getFolder("path"),
			img = loadImage(thepath + "images/misc/1.png");
		var result = typeof img.size;
		Y.Assert.areSame("number", result);
	},
	// 5 --**-- Property width exist 
	testImage_PropertyWidthExist_5: function() {
		var thepath = getFolder("path"),
			img = loadImage(thepath + "images/misc/1.png");
		var result = typeof img.width;
		Y.Assert.areSame("number", result);
	},
	// 6 --**-- Method save() exist 
	testImage_MethodSaveExist_6: function() {
		var MyImage = new ds.Image(),
			thepath = getFolder("path"),
			img = loadImage(thepath + "images/misc/1.png");
		MyImage.pics = img;
		var result = typeof MyImage.save();
		Y.Assert.areSame("boolean", result);
	},
	// 7 --**-- Method saveMeta() exist 
	testImage_MethodSaveMetaExist_7: function() {
		var MyImage = new ds.Image();
		thepath = getFolder("path"), img = loadImage(thepath + "images/misc/1.png"), newMeta = {
			IPTC: {
				Keywords: "Wakanda"
			}
		};
		img.saveMeta(newMeta);// nothing to test, saveMeta does not return anything
	},
	// 8 --**-- Method setPath() exist 
	testImage_MethodSethPathExist_8: function() {
		var thepath = getFolder("path"),
			pictFile = File(thepath + "images/misc/1.png"),
			myPict = loadImage(pictFile),
			thumb = myPict.thumbnail(300, 200, 4),
			thumbFile = File(pictFile.getParent(), pictFile.nameNoExt + "_thumb." + pictFile.extension);
		var result = typeof thumb.setPath(thumbFile);
		Y.Assert.areSame("object", result);
	},
	// 9 --**-- Method thumbnail() exist  
	testImage_MethodThumbnailExist_9: function() {
		var thepath = getFolder("path"),
			e,
			pictFile = File(thepath + "images/misc/1.png"),
			myPict = loadImage(pictFile);
		try
		{
			var result = typeof myPict.thumbnail(300, 200, 4);
		}
		catch(e)
		{
			console.log(e);
		}
		if (os.isLinux)
			Y.Assert.areSame(undefined, result); // not developed as yet
		else
		Y.Assert.areSame("object",result);
	},
	// 10 --**-- Method LoadImage() exist  
	testImage_MethodLoadImageExist_10: function() {
		var MyImage = new ds.Image(),
			thepath = getFolder("path");
		var result = typeof loadImage(thepath + "images/misc/1.png");
		Y.Assert.areSame("object", result);
	},
	// 11 --**-- Image Object : number of properties 
	testImage_NumberOfPropertiesObjectImage_11: function() {
		var MyImage = new ds.Image();
		thepath = getFolder("path"), img = loadImage(thepath + "images/misc/1.png");
		var result = count.call(img);
		Y.Assert.areEqual(5, result);
	},
	// 12 --**-- Image Object width image test 	
	testImage_ImageObjectWidthMiscImageTest_12: function() {
		var thepath = getFolder("path"),
			img = loadImage(thepath + "images/misc/1.png");
		var result = img.width;
		Y.Assert.areEqual(477, result);
	},
	// 13 --**-- Image Object height image test 	
	testImage_ImageObjectHeightMiscImageTest_13: function() {
		var thepath = getFolder("path"),
			img = loadImage(thepath + "images/misc/1.png");
		var result = img.height;
		Y.Assert.areEqual(300, result);
	},
	// 14 --**-- Image Object length image test 	
	testImage_ImageObjectLengthMiscImageTest_14: function() {
		var thepath = getFolder("path"),
			img = loadImage(thepath + "images/misc/1.png");
		var result = img.length;
		Y.Assert.areEqual(109462, result);
	},
	// 15 --**-- Save the picture in an entity with an abolute Path with LoadImage(), with image test (jpeg)
	testImage_SaveImageAsEntityAbsolutePathWithLoadImageTestjpg_15: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/misc/1.png");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areEqual(0, exceptions);
		Y.Assert.isNotNull(MyImage.pics);
		Y.Assert.areEqual(true, result);
	},
	// 16 --**--Save the picture in an entity with a File Object with LoadImage(), with image test (jpeg)
	testImage_SaveImageAsEntityFileObjectWithLoadImageTestjpg_16: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			var pictFile = File(thepath + "images/misc/1.png"),
				img = loadImage(pictFile);
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		}
		Y.Assert.areSame(0, exceptions);
		Y.Assert.isNotNull(MyImage.pics);
		Y.Assert.areEqual(true, result);
	},
	/*
     *
		Property for Meta Format missing in EXIF :
			- Flash/Fired
			- Flash/functionPresent 
			- Flash/Mode
			- Flash/RedEyeReduction
			- Flash/ReturnLight
			- Gamma
     *
     */
	// 879 --**-- Check meta (Format EXIF), property ApertureValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFApertureValue320240JPEG_879: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(6.65625, MyImage.pics.meta.EXIF.ApertureValue);
	},
	// 880 --**-- Check meta (Format EXIF), property BrightnessValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFBrightnessValue320240JPEG_880: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.BrightnessValue);
	},
	// 881 --**-- Check meta (Format EXIF), property ColorSpace of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFColorSpace320240JPEG_881: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(1, MyImage.pics.meta.EXIF.ColorSpace);
	},
	// 882 --**-- Check meta (Format EXIF), property ComponentsConfiguration of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFComponentsConfiguration320240JPEG_882: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("1;2;3;0", MyImage.pics.meta.EXIF.ComponentsConfiguration);
	},
	// 883 --**-- Check meta (Format EXIF), property Contrast of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFContrast320240JPEG_883: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.Contrast);
	},
	// 884 --**-- Check meta (Format EXIF), property CustomRendered of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFCustomRendered320240JPEG_884: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.CustomRendered);
	},
	// 885 --**-- Check meta (Format EXIF), property DateTimeDigitized of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFDateTimeDigitized320240JPEG_885: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("2004-09-11T12:38:06Z", MyImage.pics.meta.EXIF.DateTimeDigitized);
	},
	// 886 --**-- Check meta (Format EXIF), property DateTimeOriginal of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFDateTimeOriginal320240JPEG_886: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("2004-09-11T12:38:06Z", MyImage.pics.meta.EXIF.DateTimeOriginal);
	},
	// 887 --**-- Check meta (Format EXIF), property DigitalZoomRatio of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFDigitalZoomRatio320240JPEG_887: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.DigitalZoomRatio);
	},
	// 888 --**-- Check meta (Format EXIF), property ExifVersion of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExifVersion320240JPEG_888: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0210", MyImage.pics.meta.EXIF.ExifVersion);
	},
	// 889 --**-- Check meta (Format EXIF), property ExposureBiasValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureBiasValue320240JPEG_889: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.ExposureBiasValue);
	},
	// 890 --**-- Check meta (Format EXIF), property ExposureIndex of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureIndex320240JPEG_890: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.ExposureIndex);
	},
	// 891 --**-- Check meta (Format EXIF), property ExposureMode of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureMode320240JPEG_891: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.ExposureMode);
	},
	// 892 --**-- Check meta (Format EXIF), property ExposureTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFExposureTime320240JPEG_892: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0.00625, MyImage.pics.meta.EXIF.ExposureTime);
	},
	// 893 --**-- Check meta (Format EXIF), property FileSource of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFileSource320240JPEG_893: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("3", MyImage.pics.meta.EXIF.FileSource);
	},
	// 894 --**-- Check meta (Format EXIF), property Flash of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFlash320240JPEG_894: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.Flash);
	},
	// 895 --**-- Check meta (Format EXIF), property FlashEnergy of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFlashEnergy320240JPEG_895: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.Flash);
	},
	// 896 --**-- Check meta (Format EXIF), property FlashPixVersion of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFlashPixVersion320240JPEG_896: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0100", MyImage.pics.meta.EXIF.FlashPixVersion);
	},
	// 897 --**-- Check meta (Format EXIF), property FNumber of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFNumber320240JPEG_897: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(10, MyImage.pics.meta.EXIF.FNumber);
	},
	// 898 --**-- Check meta (Format EXIF), property FocalLength of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalLength320240JPEG_898: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(10.8125, MyImage.pics.meta.EXIF.FocalLength);
	},
	// 899 --**-- Check meta (Format EXIF), property FocalLenIn35mmFilm of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalLenIn35mmFilm320240JPEG_899: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.FocalLenIn35mmFilm);
	},
	// 900 --**-- Check meta (Format EXIF), property FocalPlaneResolutionUnit of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalPlaneResolutionUnit320240JPEG_900: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(2, MyImage.pics.meta.EXIF.FocalPlaneResolutionUnit);
	},
	// 901 --**-- Check meta (Format EXIF), property FocalPlaneXResolution of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalPlaneXResolution320240JPEG_901: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(7766.9902912621, MyImage.pics.meta.EXIF.FocalPlaneXResolution);
	},
	// 902 --**-- Check meta (Format EXIF), property FocalPlaneYResolution of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFFocalPlaneYResolution320240JPEG_902: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(7741.935483871, MyImage.pics.meta.EXIF.FocalPlaneYResolution);
	},
	// 903 --**-- Check meta (Format EXIF), property GainControl of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFGainControl320240JPEG_903: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.GainControl);
	},
	// 904 --**-- Check meta (Format EXIF), property ImageUniqueID of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFImageUniqueID320240JPEG_904: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0", MyImage.pics.meta.EXIF.ImageUniqueID);
	},
	// 905 --**-- Check meta (Format EXIF), property ISOSpeedRatings of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFISOSpeedRatings320240JPEG_905: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(69, MyImage.pics.meta.EXIF.ISOSpeedRatings);
	},
	// 906 --**-- Check meta (Format EXIF), property LightSource of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFLightSource320240JPEG_906: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.LightSource);
	},
	// 907 --**-- Check meta (Format EXIF), property MakerNote of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFMakerNote320240JPEG_907: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.EXIF.MakerNote);
	},
	// 908 --**-- Check meta (Format EXIF), property MaxApertureValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFMaxApertureValue320240JPEG_908: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(2.9708557128906, MyImage.pics.meta.EXIF.MaxApertureValue);
	},
	// 909 --**-- Check meta (Format EXIF), property MeteringMode of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFMeteringMode320240JPEG_909: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(5, MyImage.pics.meta.EXIF.MeteringMode);
	},
	// 910 --**-- Check meta (Format EXIF), property PixelXDimension of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFPixelXDimension320240JPEG_910: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(320, MyImage.pics.meta.EXIF.PixelXDimension);
	},
	// 911 --**-- Check meta (Format EXIF), property PixelYDimension of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFPixelYDimension320240JPEG_911: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(240, MyImage.pics.meta.EXIF.PixelYDimension);
	},
	// 912 --**-- Check meta (Format EXIF), property RelatedSoundFile of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFRelatedSoundFile320240JPEG_912: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0", MyImage.pics.meta.EXIF.RelatedSoundFile);
	},
	// 913 --**-- Check meta (Format EXIF), property Saturation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSaturation320240JPEG_913: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.Saturation);
	},
	// 914 --**-- Check meta (Format EXIF), property SceneCaptureType of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSceneCaptureType320240JPEG_914: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.SceneCaptureType);
	},
	// 915 --**-- Check meta (Format EXIF), property SceneType of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSceneType320240JPEG_915: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.SceneType);
	},
	// 916 --**-- Check meta (Format EXIF), property SensingMethod of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSensingMethod320240JPEG_916: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(2, MyImage.pics.meta.EXIF.SensingMethod);
	},
	// 917 --**-- Check meta (Format EXIF), property Sharpness of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSharpness320240JPEG_917: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.Sharpness);
	},
	// 918 --**-- Check meta (Format EXIF), property ShutterSpeedValue of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFShutterSpeedValue320240JPEG_918: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(7.3125, MyImage.pics.meta.EXIF.ShutterSpeedValue);
	},
	// 919 --**-- Check meta (Format EXIF), property SpectralSensitivity of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSpectralSensitivity320240JPEG_919: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0", MyImage.pics.meta.EXIF.SpectralSensitivity);
	},
	// 920 --**-- Check meta (Format EXIF), property SubjectArea of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectArea320240JPEG_920: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0;0", MyImage.pics.meta.EXIF.SubjectArea);
	},
	// 921 --**-- Check meta (Format EXIF), property SubjectDistance of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectDistance320240JPEG_921: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(65.535, MyImage.pics.meta.EXIF.SubjectDistance);
	},
	// 922 --**-- Check meta (Format EXIF), property SubjectDistRange of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectDistRange320240JPEG_922: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.SubjectDistRange);
	},
	// 923 --**-- Check meta (Format EXIF), property SubjectLocation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFSubjectLocation320240JPEG_923: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.SubjectLocation);
	},
	// 924 --**-- Check meta (Format EXIF), property UserComment of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFUserComment320240JPEG_924: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.EXIF.UserComment);
	},
	// 925 --**-- Check meta (Format EXIF), property WhiteBalance of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatEXIFWhiteBalance320240JPEG_925: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.EXIF.WhiteBalance);
	},
	/*
     *
		Property for Meta Format missing in IPTC :
			- Edit Status
			- ImageOrientation
			- ImageType
			- ObjectCycle
	
     *
     */
	// 926 --**-- Check meta (Format IPTC), property Byline of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCByline320240JPEG_926: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.Byline);
	},
	// 927 --**-- Check meta (Format IPTC), property BylineTitle of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCBylineTitle320240JPEG_927: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.BylineTitle);
	},
	// 928 --**-- Check meta (Format IPTC), property CaptionAbstract of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCaptionAbstract320240JPEG_928: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.CaptionAbstract);
	},
	// 929 --**-- Check meta (Format IPTC), property Category of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCategory320240JPEG_929: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.Category);
	},
	// 930 --**-- Check meta (Format IPTC), property City of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCity320240JPEG_930: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.City);
	},
	// 931 --**-- Check meta (Format IPTC), property Contact of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContact320240JPEG_931: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.Contact);
	},
	// 932 --**-- Check meta (Format IPTC), property ContentLocationCode of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContentLocationCode320240JPEG_932: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.ContentLocationCode);
	},
	// 933 --**-- Check meta (Format IPTC), property ContentLocationName of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCContentLocationName320240JPEG_933: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.ContentLocationName);
	},
	// 934 --**-- Check meta (Format IPTC), property Credit of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCCredit320240JPEG_934: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.Credit);
	},
	// 935 --**-- Check meta (Format IPTC), property DateTimeCreated of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCDateTimeCreated320240JPEG_935: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("2004-09-11T12:38:06Z", MyImage.pics.meta.IPTC.DateTimeCreated);
	},
	// 936 --**-- Check meta (Format IPTC), property DigitalCreationDateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCDigitalCreationDateTime320240JPEG_936: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("2004-09-11T12:38:06Z", MyImage.pics.meta.IPTC.DigitalCreationDateTime);
	},
	// 937 --**-- Check meta (Format IPTC), property ExpirationDateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCExpirationDateTime320240JPEG_937: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0000-00-00T00:00:00Z", MyImage.pics.meta.IPTC.ExpirationDateTime);
	},
	// 938 --**-- Check meta (Format IPTC), property FixtureIdentifier of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCFixtureIdentifier320240JPEG_938: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.FixtureIdentifier);
	},
	// 939 --**-- Check meta (Format IPTC), property Headline of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCHeadline320240JPEG_939: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.Headline);
	},
	// 940 --**-- Check meta (Format IPTC), property Keywords of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCKeywords320240JPEG_940: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.Keywords);
	},
	// 941 --**-- Check meta (Format IPTC), property LanguageIdentifier of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCLanguageIdentifier320240JPEG_941: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.LanguageIdentifier);
	},
	// 942 --**-- Check meta (Format IPTC), property ObjectAttributeReference of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCObjectAttributeReference320240JPEG_942: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.ObjectAttributeReference);
	},
	// 943 --**-- Check meta (Format IPTC), property ObjectName of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCObjectName320240JPEG_943: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.ObjectName);
	},
	// 944 --**-- Check meta (Format IPTC), property OriginalTransmissionReference of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCOriginalTransmissionReference320240JPEG_944: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.OriginalTransmissionReference);
	},
	// 945 --**-- Check meta (Format IPTC), property OriginatingProgram of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCOriginatingProgram320240JPEG_945: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.OriginatingProgram);
	},
	// 946 --**-- Check meta (Format IPTC), property ProgramVersion of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCProgramVersion320240JPEG_946: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.ProgramVersion);
	},
	// 947 --**-- Check meta (Format IPTC), property ProvinceState of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCProvinceState320240JPEG_947: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.ProvinceState);
	},
	// 948 --**-- Check meta (Format IPTC), property ReleaseDateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCReleaseDateTime320240JPEG_948: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0000-00-00T00:00:00Z", MyImage.pics.meta.IPTC.ReleaseDateTime);
	},
	// 949 --**-- Check meta (Format IPTC), property Scene of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCScene320240JPEG_949: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("011000", MyImage.pics.meta.IPTC.Scene);
	},
	// 950 --**-- Check meta (Format IPTC), property Source of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSource320240JPEG_950: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.Source);
	},
	// 951 --**-- Check meta (Format IPTC), property Source of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSource320240JPEG_951: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.Source);
	},
	// 952 --**-- Check meta (Format IPTC), property SpecialInstructions of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSpecialInstructions320240JPEG_952: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.SpecialInstructions);
	},
	// 953 --**-- Check meta (Format IPTC), property StarRating of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCStarRating320240JPEG_953: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0", MyImage.pics.meta.IPTC.StarRating);
	},
	// 954 --**-- Check meta (Format IPTC), property SubjectReference of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSubjectReference320240JPEG_954: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("00000000", MyImage.pics.meta.IPTC.SubjectReference);
	},
	// 955 --**-- Check meta (Format IPTC), property SubLocation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSubLocation320240JPEG_955: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.SubLocation);
	},
	// 956 --**-- Check meta (Format IPTC), property SupplementalCategory of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCSupplementalCategory320240JPEG_956: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.SupplementalCategory);
	},
	// 957 --**-- Check meta (Format IPTC), property Urgency of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCUrgency320240JPEG_957: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("0", MyImage.pics.meta.IPTC.Urgency);
	},
	// 958 --**-- Check meta (Format IPTC), property WriterEditor of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatIPTCWriterEditor320240JPEG_958: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.IPTC.WriterEditor);
	},
	/*
     *
		Property for Meta Format missing in TIFF :
			- Compression 
			
     *
     */
	// 959 --**-- Check meta (Format TIFF), property Artist of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFArtist320240JPEG_959: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.TIFF.Artist);
	},
	// 960 --**-- Check meta (Format TIFF), property Copyright of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFCopyright320240JPEG_960: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.TIFF.Copyright);
	},
	// 961 --**-- Check meta (Format TIFF), property DateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFDateTime320240JPEG_961: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("2013-03-29T17:05:42Z", MyImage.pics.meta.TIFF.DateTime);
	},
	// 962 --**-- Check meta (Format TIFF), property DocumentName of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFDocumentName320240JPEG_962: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.TIFF.DocumentName);
	},
	// 963 --**-- Check meta (Format TIFF), property HostComputer of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFHostComputer320240JPEG_963: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.TIFF.HostComputer);
	},
	// 964 --**-- Check meta (Format TIFF), property ImageDescription of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFImageDescription320240JPEG_964: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.TIFF.ImageDescription);
	},
	// 965 --**-- Check meta (Format TIFF), property Make of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFMake320240JPEG_965: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("Canon", MyImage.pics.meta.TIFF.Make);
	},
	// 966 --**-- Check meta (Format TIFF), property Model of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFModel320240JPEG_966: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("Canon PowerShot S110", MyImage.pics.meta.TIFF.Model);
	},
	// 967 --**-- Check meta (Format TIFF), property Orientation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFOrientation320240JPEG_967: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(1, MyImage.pics.meta.TIFF.Orientation);
	},
	// 968 --**-- Check meta (Format TIFF), property PhotometricInterpretation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFPhotometricInterpretation320240JPEG_968: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(2, MyImage.pics.meta.TIFF.PhotometricInterpretation);
	},
	// 969 --**-- Check meta (Format TIFF), property ResolutionUnit of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFResolutionUnit320240JPEG_969: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(2, MyImage.pics.meta.TIFF.ResolutionUnit);
	},
	// 970 --**-- Check meta (Format TIFF), property Software of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFSoftware320240JPEG_970: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("Adobe Photoshop CS6 (Windows)", MyImage.pics.meta.TIFF.Software);
	},
	// 971 --**-- Check meta (Format TIFF), property XResolution of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFXResolution320240JPEG_971: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(72, MyImage.pics.meta.TIFF.XResolution);
	},
	// 972 --**-- Check meta (Format TIFF), property YResolution of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatTIFFYResolution320240JPEG_972: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(72, MyImage.pics.meta.TIFF.YResolution);
	},
	/*
     *
		Property for Meta Format missing in GPS :
			- DestBearingRef
			- DestDistanceRef
			- DestLatitude/Deg
			- DestLatitude/Dir
			- DestLatitude/Min
			- DestLatitude/Sec
			- DestLongitude/Deg
			- DestLongitude/Dir
			- DestLongitude/Min 
			- DestLongitude/Sec
			- VersionID

     *
     */
	// 973 --**-- Check meta (Format GPS), property Altitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSAltitude320240JPEG_973: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.GPS.Altitude);
	},
	// 974 --**-- Check meta (Format GPS), property AltitudeRef of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSAltitudeRef320240JPEG_974: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.GPS.AltitudeRef);
	},
	// 975 --**-- Check meta (Format GPS), property AreaInformation of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSAreaInformation320240JPEG_975: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.GPS.AreaInformation);
	},
	// 976 --**-- Check meta (Format GPS), property DateTime of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDateTime320240JPEG_976: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("2013-03-29T17:05:42Z", MyImage.pics.meta.GPS.DateTime);
	},
	// 977 --**-- Check meta (Format GPS), property DestBearing of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestBearing320240JPEG_977: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.GPS.DestBearing);
	},
	// 978 --**-- Check meta (Format GPS), property DestDistance of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestDistance320240JPEG_978: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.GPS.DestDistance);
	},
	// 979 --**-- Check meta (Format GPS), property DestLatitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestLatitude320240JPEG_979: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("00,00,0N", MyImage.pics.meta.GPS.DestLatitude);
	},
	// 980 --**-- Check meta (Format GPS), property DestLongitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDestLongitude320240JPEG_980: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("00,00,0E", MyImage.pics.meta.GPS.DestLongitude);
	},
	// 981 --**-- Check meta (Format GPS), property Differential of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDifferential320240JPEG_981: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.GPS.Differential);
	},
	// 982 --**-- Check meta (Format GPS), property DOP of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSDOP320240JPEG_982: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.GPS.DOP);
	},
	// 983 --**-- Check meta (Format GPS), property ImgDirection of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSImgDirection320240JPEG_983: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.GPS.ImgDirection);
	},
	// 984 --**-- Check meta (Format GPS), property ImgDirectionRef of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSImgDirectionRef320240JPEG_984: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("M", MyImage.pics.meta.GPS.ImgDirectionRef);
	},
	// 985 --**-- Check meta (Format GPS), property Latitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSLatitude320240JPEG_985: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("00,00,0N", MyImage.pics.meta.GPS.Latitude);
	},
	// 986 --**-- Check meta (Format GPS), property Longitude of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSLongitude320240JPEG_986: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("00,00,0W", MyImage.pics.meta.GPS.Longitude);
	},
	// 987 --**-- Check meta (Format GPS), property MapDatum of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSMapDatum320240JPEG_987: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.GPS.MapDatum);
	},
	// 988 --**-- Check meta (Format GPS), property MeasureMode of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSMeasureMode320240JPEG_988: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("2", MyImage.pics.meta.GPS.MeasureMode);
	},
	// 989 --**-- Check meta (Format GPS), property ProcessingMethod of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSProcessingMethod320240JPEG_989: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.GPS.ProcessingMethod.toString());
	},
	// 990 --**-- Check meta (Format GPS), property Satellites of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSSatellites320240JPEG_990: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.GPS.Satellites);
	},
	// 991 --**-- Check meta (Format GPS), property Speed of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSSpeed320240JPEG_991: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.GPS.Speed);
	},
	// 992 --**-- Check meta (Format GPS), property SpeedRef of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSSpeedRef320240JPEG_992: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("K", MyImage.pics.meta.GPS.SpeedRef);
	},
	// 993 --**-- Check meta (Format GPS), property Status of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSStatus320240JPEG_993: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("A", MyImage.pics.meta.GPS.Status);
	},
	// 994 --**-- Check meta (Format GPS), property Track of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSTrack320240JPEG_994: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(0, MyImage.pics.meta.GPS.Track);
	},
	// 995 --**-- Check meta (Format GPS), property TrackRef of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageCheckMetaFormatGPSTrack320240JPEG_995: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e;
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("T", MyImage.pics.meta.GPS.TrackRef);
	},
	// 996 --**-- Check new meta saved (Format IPTC), random property of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageNewMetaFormatIPTCKeyword320240JPEG_996: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e, newFolderTest = Folder(thepath + "images/testNewMeta/"),
			pictureToCopy = new File(thepath + "images/jpeg/320240.jpg"),
			meta = {
				IPTC: {
					Keywords: "vacation"
				}
			};
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		//Copy the pictures 
		pictureToCopy.copyTo(thepath + "images/testNewMeta/320240_copy.jpg", "Overwrite");
		try {
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			//Save the meta into the picture
			img.saveMeta(meta);
			//Save the picture with the meta locally 
			img.save(thepath + "images/testNewMeta/320240_copy.jpg");
			//Re-Load the Image to get the good meta information	
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("vacation", MyImage.pics.meta.IPTC.Keywords);
		var pictureToRemove = new File(thepath + "images/testNewMeta/320240_copy.jpg");
		pictureToRemove.remove();
	},
	// 997 --**-- Check new meta saved (Format EXIF), random property of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageNewMetaFormatEXIFApertureValue320240JPEG_997: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e, newFolderTest = Folder(thepath + "images/testNewMeta/"),
			pictureToCopy = new File(thepath + "images/jpeg/320240.jpg"),
			meta = {
				EXIF: {
					ApertureValue: 45
				}
			};
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		//Copy the pictures 
		pictureToCopy.copyTo(thepath + "images/testNewMeta/320240_copy.jpg", "Overwrite");
		try {
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			//Save the meta into the picture
			img.saveMeta(meta);
			//Save the picture with the meta locally 
			img.save(thepath + "images/testNewMeta/320240_copy.jpg");
			//Re-Load the Image to get the good meta information	
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(45, MyImage.pics.meta.EXIF.ApertureValue);
		var pictureToRemove = new File(thepath + "images/testNewMeta/320240_copy.jpg");
		pictureToRemove.remove();
	},
	// 998 --**-- Check new meta saved (Format GPS), random property of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageNewMetaFormatGPSAltitude320240JPEG_998: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e, newFolderTest = Folder(thepath + "images/testNewMeta/"),
			pictureToCopy = new File(thepath + "images/jpeg/320240.jpg"),
			meta = {
				GPS: {
					Altitude: 10
				}
			};
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		//Copy the pictures 
		pictureToCopy.copyTo(thepath + "images/testNewMeta/320240_copy.jpg", "Overwrite");
		try {
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			//Save the meta into the picture
			img.saveMeta(meta);
			//Save the picture with the meta locally 
			img.save(thepath + "images/testNewMeta/320240_copy.jpg");
			//Re-Load the Image to get the good meta information	
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame(10, MyImage.pics.meta.GPS.Altitude);
		var pictureToRemove = new File(thepath + "images/testNewMeta/320240_copy.jpg");
		pictureToRemove.remove();
	},
	// 999 --**-- Check new meta saved (Format TIFF), random property of the picture saved with LoadImage(), with an image 320*240 (jpg)
	testImage_SaveImageImgWithLoadImageNewMetaFormatTIFFArtist320240JPEG_999: function() {
		var MyImage = new ds.ImageWithLoadImage(),
			thepath = getFolder("path"),
			exceptions = 0,
			e, newFolderTest = Folder(thepath + "images/testNewMeta/"),
			pictureToCopy = new File(thepath + "images/jpeg/320240.jpg"),
			meta = {
				TIFF: {
					Artist: "test"
				}
			};
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		//Copy the pictures 
		pictureToCopy.copyTo(thepath + "images/testNewMeta/320240_copy.jpg", "Overwrite");
		try {
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			//Save the meta into the picture
			img.saveMeta(meta);
			//Save the picture with the meta locally 
			img.save(thepath + "images/testNewMeta/320240_copy.jpg");
			//Re-Load the Image to get the good meta information	
			img = loadImage(thepath + "images/testNewMeta/320240_copy.jpg");
			MyImage.pics = img;
			MyImage.info = i;
			result = MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areSame("test", MyImage.pics.meta.TIFF.Artist);
		var pictureToRemove = new File(thepath + "images/testNewMeta/320240_copy.jpg");
		pictureToRemove.remove();
	},
	// 1000 --**-- Manipulate picture locally to a thumbnail as Default Mode (6, Scaled to fit proportionnaly centered)
	testImage_SaveImageManipulatedLocallyAsThumbnailDefaultMode_1000: function() {
		var thepath = getFolder("path"),
			e, exceptions = 0,
			newFolderTest = Folder(thepath + "images/testThumbnail/"),
			pictureToCopy = new File(thepath + "images/jpeg/320240.jpg");
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		//Copy the pictures 
		pictureToCopy.copyTo(thepath + "images/testThumbnail/320240_copy.jpg", "Overwrite");
		try {
			img = loadImage(thepath + "images/testThumbnail/320240_copy.jpg");
			thumbPicture = img.thumbnail(100, 100);
			//Save The picture locally
			thumbPicture.save(thepath + "images/testThumbnail/320240_thumb_10075_6_default.jpg");
		} catch (e) {
			exceptions++;
			console.log("we caught :" + e);
		}
		img = loadImage(thepath + "images/testThumbnail/320240_thumb_10075_6_default.jpg");
		result1 = img.height;
		result2 = img.width;
		Y.Assert.areSame(75, result1);
		Y.Assert.areSame(100, result2);
		Y.Assert.areSame(0, exceptions);
		var pictureToRemove = new File(thepath + "images/testThumbnail/320240_copy.jpg"),
			pictureToRemoveBis = new File(thepath + "images/testThumbnail/320240_thumb_10075_6_default.jpg");
		pictureToRemove.remove();
		pictureToRemoveBis.remove();
	},
	// 1001 --**-- Manipulate picture locally to a thumbnail as scaled to fit Mode (2, Scaled to fit)
	testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitMode_1001: function() {
		var thepath = getFolder("path"),
			e, exceptions = 0,
			newFolderTest = Folder(thepath + "images/testThumbnail/"),
			pictureToCopy = new File(thepath + "images/jpeg/320240.jpg");
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		//Copy the pictures 
		pictureToCopy.copyTo(thepath + "images/testThumbnail/320240_copy.jpg", "Overwrite");
		try {
			img = loadImage(thepath + "images/testThumbnail/320240_copy.jpg");
			thumbPicture = img.thumbnail(100, 100, 2);
			//Save The picture locally
			thumbPicture.save(thepath + "images/testThumbnail/320240_thumb_100100_2.jpg");
		} catch (e) {
			exceptions++;
			console.log("we caught :" + e);
		}
		img = loadImage(thepath + "images/testThumbnail/320240_thumb_100100_2.jpg");
		result1 = img.height;
		result2 = img.width;
		Y.Assert.areSame(100, result1);
		Y.Assert.areSame(100, result2);
		Y.Assert.areSame(0, exceptions);
		var pictureToRemove = new File(thepath + "images/testThumbnail/320240_copy.jpg"),
			pictureToRemoveBis = new File(thepath + "images/testThumbnail/320240_thumb_100100_2.jpg");
		pictureToRemove.remove();
		pictureToRemoveBis.remove();
	},
	// 1002 --**-- Manipulate picture locally to a thumbnail as scaled to fit propertionally Mode (5, Scaled to fit proportionnaly)
	testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyMode_1002: function() {
		var thepath = getFolder("path"),
			e, exceptions = 0,
			newFolderTest = Folder(thepath + "images/testThumbnail/"),
			pictureToCopy = new File(thepath + "images/jpeg/320240.jpg");
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		//Copy the pictures 
		pictureToCopy.copyTo(thepath + "images/testThumbnail/320240_copy.jpg", "Overwrite");
		try {
			img = loadImage(thepath + "images/testThumbnail/320240_copy.jpg");
			thumbPicture = img.thumbnail(100, 100, 5);
			//Save The picture locally
			thumbPicture.save(thepath + "images/testThumbnail/320240_thumb_10075_5.jpg");
		} catch (e) {
			exceptions++;
			console.log("we caught :" + e);
		}
		img = loadImage(thepath + "images/testThumbnail/320240_thumb_10075_5.jpg");
		result1 = img.height;
		result2 = img.width;
		Y.Assert.areSame(75, result1);
		Y.Assert.areSame(100, result2);
		Y.Assert.areSame(0, exceptions);
		var pictureToRemove = new File(thepath + "images/testThumbnail/320240_copy.jpg"),
			pictureToRemoveBis = new File(thepath + "images/testThumbnail/320240_thumb_10075_5.jpg");
		pictureToRemovepictureToRemove.remove();
		pictureToRemoveBis.remove();
	},
	// 1003 --**-- Manipulate picture locally to a thumbnail as scaled to fit propertionally centered Mode (6, Scaled to fit proportionnaly centered)
	testImage_SaveImageManipulatedLocallyAsThumbnailScaledToFitProportionallyCenteredMode_1003: function() {
		var thepath = getFolder("path"),
			e, exceptions = 0,
			newFolderTest = Folder(thepath + "images/testThumbnail/"),
			pictureToCopy = new File(thepath + "images/jpeg/320240.jpg");
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		//Copy the pictures 
		pictureToCopy.copyTo(thepath + "images/testThumbnail/320240_copy.jpg", "Overwrite");
		try {
			img = loadImage(thepath + "images/testThumbnail/320240_copy.jpg");
			thumbPicture = img.thumbnail(100, 100, 6);
			//Save The picture locally
			thumbPicture.save(thepath + "images/testThumbnail/320240_thumb_10075_6.jpg");
		} catch (e) {
			exceptions++;
			console.log("we caught :" + e);
		}
		img = loadImage(thepath + "images/testThumbnail/320240_thumb_10075_6.jpg");
		result1 = img.height;
		result2 = img.width;
		Y.Assert.areSame(75, result1);
		Y.Assert.areSame(100, result2);
		Y.Assert.areSame(0, exceptions);
		var pictureToRemove = new File(thepath + "images/testThumbnail/320240_copy.jpg"),
			pictureToRemoveBis = new File(thepath + "images/testThumbnail/320240_thumb_10075_6.jpg");
		pictureToRemovepictureToRemove.remove();
		pictureToRemoveBis.remove();
	},
	// 1004 --**-- Save a picture locally as copy with a String (Absolute file to path)
	testImage_SaveImageOnDiskLogic1_1004: function() {
		var thepath = getFolder("path"),
			e, exceptions = 0,
			newFolderTest = Folder(thepath + "images/testSaveOnDisk/");
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			//Save The picture locally
			img.save(thepath + "images/testSaveOnDisk/320240_saveLogic1.jpg", ".jpg");
		} catch (e) {
			exceptions++;
			console.log("we caught :" + e);
		}
		result = new File(thepath + "images/testSaveOnDisk/320240_saveLogic1.jpg");
		Y.Assert.isTrue(result.exists);
		Y.Assert.areSame(0, exceptions);
		var pictureToRemove = new File(thepath + "images/testSaveOnDisk/320240_saveLogic1.jpg");
		pictureToRemove.remove();
	},
	// 1005 --**-- Save a picture locally as copy with a File object in file 
	testImage_SaveImageOnDiskLogic2_1005: function() {
		var thepath = getFolder("path"),
			e, exceptions = 0,
			newFolderTest = Folder(thepath + "images/testSaveOnDisk/");
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			//Save The picture locally
			img.save(File(thepath + "images/testSaveOnDisk/320240_saveLogic2.jpg", ".jpg"));
		} catch (e) {
			exceptions++;
			console.log("we caught :" + e);
		}
		result = new File(thepath + "images/testSaveOnDisk/320240_saveLogic2.jpg");
		Y.Assert.isTrue(result.exists);
		Y.Assert.areSame(0, exceptions);
		var pictureToRemove = new File(thepath + "images/testSaveOnDisk/320240_saveLogic2.jpg");
		pictureToRemove.remove();
	},
	// 1006 --**-- Save a picture with a new path  
	testImage_SaveAPictureWithASetNewPath_1006: function() {
		var thepath = getFolder("path"),
			e, exceptions = 0,
			newFolderTest = Folder(thepath + "images/testSaveOnDisk/"),
			MyImage = new ds.ImageWithLoadImage();
		//Folder exist? 
		if (newFolderTest.exists == false) {
			newFolderTest.create();
		} else {
			//Folder already exist
		}
		try {
			img = loadImage(thepath + "images/jpeg/320240.jpg");
			img.setPath(thepath + "images/testSaveOnDisk/320240.jpg");
			MyImage.pics = img;
			MyImage.save();
		} catch (e) {
			exceptions++;
			console.log("we caught :" + e);
		}
		result = new File(thepath + "images/testSaveOnDisk/320240_newpath.jpg");
		Y.Assert.isTrue(result.exists);
		Y.Assert.areSame(0, exceptions);
		Y.Assert.isNotNull(MyImage.pics);
		var pictureToRemove = new File(thepath + "images/testSaveOnDisk/320240_newpath.jpg");
		pictureToRemove.remove();
	}
};
/*
    //create the console
    (new Y.Test.Console({
        newestOnTop : false,
        filters: {
            pass: true,
            fail: true
        }
    })).render('#testLogger');

    Y.Test.Runner.add(Y.example.test.ExampleSuite);

    //run the tests
    Y.Test.Runner.run();
    */
if (typeof dontRequireUnitTest === 'undefined') {
	require("unitTest").run(testCase).getReport();
}