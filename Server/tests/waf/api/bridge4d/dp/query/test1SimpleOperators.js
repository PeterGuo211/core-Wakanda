var testCase = {

		name : "Simple operators",


		                           /*                        *
	                            	*   Test of And Operator  *
		                            *                        *
	                                */                      
	                                
		/**
		 * SO-00. test of and query using and
		 */
		testQAND : function() {
		var testRunner = this;
		ds.Emp.query("name = yassin and age =24",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   event.entityCollection.getEntity(0,{
		                          'onSuccess':function(e){
		                                Y.Assert.areSame("yassin",e.entity.name.getValue());
								        Y.Assert.areSame("wakanda",e.entity.depart.getValue());
		                          },
	                              'onError':function(er){
		                               testRunner.resume(function() {
		                               Y.Assert.fail("No EntityCollection returned");
							             });
	                            	}
	                        });
	                        });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},


        /**
		 * SO-01. test of and using &
		 */
		testQAndUsingSymbol : function() {
		var testRunner = this;
		ds.Emp.query("name = yassin & age =24",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   event.entityCollection.getEntity(0,{
		                          'onSuccess':function(e){
		                                Y.Assert.areSame("yassin",e.entity.name.getValue());
								        Y.Assert.areSame("wakanda",e.entity.depart.getValue());
		                          },
	                              'onError':function(er){
		                               testRunner.resume(function() {
		                               Y.Assert.fail("No EntityCollection returned");
							             });
	                            	}
	                        });
	                        });		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},


		 /**
		 * SO-02. test of and using &&
		 */
		testQAndUsingDoubleSymbol : function() {
		var testRunner = this;
		ds.Emp.query("name = yassin && age =24",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   event.entityCollection.getEntity(0,{
		                          'onSuccess':function(e){
		                                Y.Assert.areSame("yassin",e.entity.name.getValue());
								        Y.Assert.areSame("wakanda",e.entity.depart.getValue());
		                          },
	                              'onError':function(er){
		                               testRunner.resume(function() {
		                               Y.Assert.fail("No EntityCollection returned");
							             });
	                            	}
	                        });
	                        });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		
		 /**
		 * SO-03. check the case sentisivity
		 */
		testQAndSensitivity : function() {
		var testRunner = this;
		ds.Emp.query("name = yaSsIn and depart =WakandA",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   event.entityCollection.getEntity(0,{
		                          'onSuccess':function(e){
		                                Y.Assert.areSame("yassin",e.entity.name.getValue());
								        Y.Assert.areSame("wakanda",e.entity.depart.getValue());
		                          },
	                              'onError':function(er){
		                               testRunner.resume(function() {
		                               Y.Assert.fail("No EntityCollection returned");
							             });
	                            	}
	                        });
	                        });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		 /**
		 * SO-04. test of and with double cotes
		 */
		testQAndWithDoubleCotes : function() {
		var testRunner = this;
		ds.Emp.query('name = "yassin" and age ="24"',{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   event.entityCollection.getEntity(0,{
		                          'onSuccess':function(e){
		                                Y.Assert.areSame("yassin",e.entity.name.getValue());
								        Y.Assert.areSame("wakanda",e.entity.depart.getValue());
		                          },
	                              'onError':function(er){
		                               testRunner.resume(function() {
		                               Y.Assert.fail("No EntityCollection returned");
							             });
	                            	}
	                        });
	                        });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		  /**
		 * SO-05. test of and with simple cotes
		 */
		 testQAndWithSimpleCotes : function() {
		var testRunner = this;
		ds.Emp.query("name = 'yassin' and age ='24'",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   event.entityCollection.getEntity(0,{
		                          'onSuccess':function(e){
		                                Y.Assert.areSame("yassin",e.entity.name.getValue());
								        Y.Assert.areSame("wakanda",e.entity.depart.getValue());
		                          },
	                              'onError':function(er){
		                               testRunner.resume(function() {
		                               Y.Assert.fail("No EntityCollection returned");
							             });
	                            	}
	                        });
	                        });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		
		 
		 /**
		 * SO-06. test of and without cotes
		 */
		testQAndWithoutCotes : function() {
		var testRunner = this;
		ds.Emp.query('name = yassin and age =24',{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   event.entityCollection.getEntity(0,{
		                          'onSuccess':function(e){
		                                Y.Assert.areSame("yassin",e.entity.name.getValue());
								        Y.Assert.areSame("wakanda",e.entity.depart.getValue());
		                          },
	                              'onError':function(er){
		                               testRunner.resume(function() {
		                               Y.Assert.fail("No EntityCollection returned");
							             });
	                            	}
	                        });
	                        });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		
		
        /**
		 * SO-07. test of and query length 
		 */
		testQANDLength : function() {
		var testRunner = this;
		ds.Emp.query("name = yassin and age =24",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                  Y.Assert.areSame(1, event.entityCollection.length,"the length of entityCollection returned should be equal to 1");
	                        });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		
		 /**
		 * SO-08. test of and using placeholders
		 */
		testQAndPlaceHolders : function() {
		var testRunner = this;
		ds.Emp.query('name = :1 and age >:2',{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   event.entityCollection.getEntity(0,{
		                          'onSuccess':function(e){
		                                Y.Assert.areSame("yassin",e.entity.name.getValue());
								        Y.Assert.areSame("wakanda",e.entity.depart.getValue());
		                          },
	                              'onError':function(er){
		                               testRunner.resume(function() {
		                               Y.Assert.fail("No EntityCollection returned");
							             });
	                            	}
	                        });
	                        });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	},params:["yassin",11]		
		});		
		testRunner.wait();
		},
		
		 /**
		 * SO-09. test of and using wrong placeholders
		 */
		/*testQAndWrongPlaceHolders : function() {
		var testRunner = this;
		ds.Emp.query('name = :1 and age >:2',{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   event.entityCollection.getEntity(0,{
		                          'onSuccess':function(e){
		                                Y.Assert.areSame("yassin",e.entity.name.getValue());
								        Y.Assert.areSame("wakanda",e.entity.depart.getValue());
		                          },
	                              'onError':function(er){
		                               testRunner.resume(function() {
		                               Y.Assert.fail("No EntityCollection returned");
							             });
	                            	}
	                        });
	                        });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	},params:["yassin",11]		
		});		
		testRunner.wait();
		}
		*/
		
		                           /*                        *
	                            	*   Test of Or Operator  *
		                            *                        *
	                                */                      
		/**
		 * SO-09. test of or query using or
		 */
		testQOR : function() {
		var testRunner = this;
		ds.Emp.query("name = yassin or age > 100",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   Y.Assert.areSame(3,event.entityCollection.length,"the length of the returned collection should be 3");
	                });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},


        /**
		 * SO-10. test of or using |
		 */
		testQORUsingSymbol : function() {
		var testRunner = this;
		ds.Emp.query("name = yassin | age > 100",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                  Y.Assert.areSame(3,event.entityCollection.length,"the length of the returned collection should be 3");
	                   });		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},


		 /**
		 * SO-11. test of or using ||
		 */
		testQORUsingDoubleSymbol : function() {
		var testRunner = this;
		ds.Emp.query("name = yassin || age >100",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                    Y.Assert.areSame(3,event.entityCollection.length,"the length of the returned collection should be 3");
	               });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		
		 /**
		 * SO-12. check the case sentisivity
		 */
		testQORSensitivity : function() {
		var testRunner = this;
		ds.Emp.query("name = yaSsIn or AgE >100 ",{
		     'onSuccess':function(event){
		     		testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection should be returned, but a collection of " + event.entityCollection.length + " entities has been returned");
					});		
		     },
		     'onError':function(e){
	 	     		testRunner.resume(function() {
		               Y.assert(true);
	              	});        
	         }		
		});		
		testRunner.wait();
		},
		 /**
		 * SO-13. test of or with double cotes
		 */
		testQORWithDoubleCotes : function() {
		var testRunner = this;
		ds.Emp.query('name = "yassin" or age > "100"',{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                    Y.Assert.areSame(3,event.entityCollection.length,"the length of the returned collection should be 3");
	               });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		  /**
		 * SO-14. test of or with simple cotes
		 */
		 testQORWithSimpleCotes : function() {
		var testRunner = this;
		ds.Emp.query("name = 'yassin' or age >'100'",{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                    Y.Assert.areSame(3,event.entityCollection.length,"the length of the returned collection should be 3");
	                });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		
		 
		 /**
		 * SO-15. test of or without cotes
		 */
		testQORWithoutCotes : function() {
		var testRunner = this;
		ds.Emp.query('name = yassin or age >100',{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                    Y.Assert.areSame(3,event.entityCollection.length,"the length of the returned collection should be 3");
	               });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	}		
		});		
		testRunner.wait();
		},
		
		
       
		 /**
		 * SO-16. test of or using placeholders
		 */
		testQORPlaceHolders : function() {
		var testRunner = this;
		ds.Emp.query('name = :1 or age >:2',{
		     'onSuccess':function(event){
		            testRunner.resume(function() {
		                   Y.Assert.areSame(3,event.entityCollection.length,"the length of the returned collection should be 3");
	               });
		
		     },
		     'onError':function(e){
	 	             testRunner.resume(function() {
	 	               Y.Assert.fail("No EntityCollection returned");
					   });
	        	},params:["yassin",100]		
		});		
		testRunner.wait();
		}
		
		
};