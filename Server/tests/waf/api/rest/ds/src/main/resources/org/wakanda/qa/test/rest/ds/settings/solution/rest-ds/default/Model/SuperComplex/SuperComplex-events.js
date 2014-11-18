model.SuperComplex.aci_string.onGet = function () {
				return "calculated";
			};


model.SuperComplex.aci_bool.onGet = function () {
				return false;
			};


model.SuperComplex.aci_byte.onGet = function () {
				return 0;
			};


model.SuperComplex.aci_word.onGet = function () {
				return 0;
			};


model.SuperComplex.aci_long.onGet = function () {
				return 0;
			};


model.SuperComplex.aci_long64.onGet = function () {
				return 0;
			};


model.SuperComplex.aci_number.onGet = function () {
				return 0;
			};


model.SuperComplex.aci_duration.onGet = function () {
				return 0;
			};


model.SuperComplex.aci_uuid.onGet = function () {
				return "00000000000000000000000000000000";
			};


model.SuperComplex.aci_date.onGet = function () {
				return new Date("01/01/2013");
			};


model.SuperComplex.aci_blob.onGet = function () {
				return new Blob(256, 88, "application/octet-stream");
			};


model.SuperComplex.aci_image.onGet = function () {
				return application.loadImage(application.getFolder("path") + "Images/img1.jpg");
			};


