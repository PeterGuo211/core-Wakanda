
var
	string,
	number,
	date,
	newEntity;


for ( var i = 0; i < 50; i++) {
	
	newEntity = ds.DataClass1.createEntity();
	
	string = "Morbi non libero nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam blandit tristique porta. Aenean nec tristique purus. Morbi felis nulla, blandit at eleifend in, venenatis ut mi. Sed urna ipsum, fringilla mollis laoreet vel, tempus eget odio. Curabitur in tempor neque. Suspendisse dapibus, sem imperdiet elementum vulputate, felis libero tempor purus, in pharetra nisl lacus quis nulla. Pellentesque molestie nunc lacus. Vestibulum in aliquet sem. Suspendisse at libero sem, in consequat purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ";
	newEntity.string = 	string;
	
	
	number = i; 
	newEntity.number = number;
	
	date = new Date(); 
	newEntity.date = date; 
	
	newEntity.save();

} 