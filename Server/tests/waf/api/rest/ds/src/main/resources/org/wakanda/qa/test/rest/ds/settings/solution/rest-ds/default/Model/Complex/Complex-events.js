model.Complex.ac_string.onGet = function () {
				return "calculated";
			};


model.Complex.ac_bool.onGet = function () {
				return false;
			};


model.Complex.ac_byte.onGet = function () {
				return 0;
			};


model.Complex.ac_word.onGet = function () {
				return 0;
			};


model.Complex.ac_long.onGet = function () {
				return 0;
			};


model.Complex.ac_long64.onGet = function () {
				return 0;
			};


model.Complex.ac_number.onGet = function () {
				return 0;
			};


model.Complex.ac_duration.onGet = function () {
				return 0;
			};


model.Complex.ac_uuid.onGet = function () {
				return "00000000000000000000000000000000";
			};


model.Complex.ac_date.onGet = function () {
				return new Date("01/01/2013");
			};


model.Complex.ac_blob.onGet = function () {
				return new Blob(256, 88, "application/octet-stream");
			};


model.Complex.ac_image.onGet = function () {
				return application.loadImage(application.getFolder("path") + "Images/img1.jpg");
			};


