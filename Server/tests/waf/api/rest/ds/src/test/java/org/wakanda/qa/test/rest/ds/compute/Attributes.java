package org.wakanda.qa.test.rest.ds.compute;

/**
 * @author soufiane.tigrioui@4d.com
 *
 */
public enum Attributes {
	
	LONG(new String[] { "as_long" }), 
	BYTE(new String[] { "as_byte" }), 
	WORD(new String[] { "as_word" }), 
	LONG64(new String[] { "as_long64" }), 
	NUMBER(new String[] { "as_number" }), 
	DURATION(new String[] { "as_duration" }), 
	STRING(new String[] { "as_string" }), 
	DATE(new String[] { "as_date" }),
	UUID(new String[] { "as_uuid" });

	private Attributes(final String[] array) {
		this.array = array;
	}

	public String[] getArray() {
		return array;
	}

	private final String[] array;

}