﻿/* This is a regular JS file */


var
	string,
	number,
	newEntity;


for ( var i = 0; i < 1000; i++) {
	
	newEntity = ds.Dataclasse1.createEntity();
	
	string = "Morbi non libero nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam blandit tristique porta. Aenean nec tristique purus. Morbi felis nulla, blandit at eleifend in, venenatis ut mi. Sed urna ipsum, fringilla mollis laoreet vel, tempus eget odio. Curabitur in tempor neque. Suspendisse dapibus, sem imperdiet elementum vulputate, felis libero tempor purus, in pharetra nisl lacus quis nulla. Pellentesque molestie nunc lacus. Vestibulum in aliquet sem. Suspendisse at libero sem, in consequat purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ";
	newEntity.attribute1 = 	string;
	
	number = i; 
	newEntity.attribute2 = number;
	
	newEntity.save();

} 

