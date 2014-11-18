/**
 * 
 */
package org.wakanda.qa.test.dataperm.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;



/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Sample extends BasicEntity{
	
	private String name;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

}
