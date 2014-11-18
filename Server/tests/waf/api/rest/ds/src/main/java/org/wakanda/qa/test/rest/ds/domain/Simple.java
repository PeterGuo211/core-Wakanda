/**
 * 
 */
package org.wakanda.qa.test.rest.ds.domain;

import org.wakanda.qa.commons.server.rest.domain.BasicEntity;

import com.google.gson.annotations.SerializedName;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class Simple extends BasicEntity {

	@SerializedName("as_string")
	private String aSString;

	@SerializedName("as_long")
	private Long aSLong;

	@SerializedName("as_date")
	private String aSDate;

	public Simple(String key) {
		super(key);
	}

	public String getASString() {
		return aSString;
	}

	public void setASString(String aSString) {
		this.aSString = aSString;
	}

	public Long getASLong() {
		return aSLong;
	}

	public void setASLong(Long aSLong) {
		this.aSLong = aSLong;
	}

	public String getASDate() {
		return aSDate;
	}

	public void setASDate(String aSDate) {
		this.aSDate = aSDate;
	}

	@Override
	public boolean equals(Object obj) {
		boolean b = super.equals(obj);
		if (obj instanceof Simple) {
			Simple vs = (Simple) obj;

			b = b && (getASString() == null ? vs.getASString() == null
							: getASString().equals(vs.getASString()));

			b = b && (getASLong() == null ? vs.getASLong() == null
					: getASLong().equals(vs.getASLong()));
			
			b = b && (getASDate() == null ? vs.getASDate() == null
					: getASDate().equals(vs.getASDate()));
			
		}
		return b;

	}
}
