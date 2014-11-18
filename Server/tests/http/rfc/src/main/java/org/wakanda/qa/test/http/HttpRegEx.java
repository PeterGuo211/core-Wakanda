package org.wakanda.qa.test.http;

public class HttpRegEx {
	
	//CHAR           = <any US-ASCII character (octets 0 - 127)>
	public static final String CHAR = "\\p{ASCII}";
	
	//CTL            = <any US-ASCII control character
    //					(octets 0 - 31) and DEL (127)>
	public static final String CTL = "\\p{Cntrl}";
	
	//Separators
	public static final String SEPARATORS = "\\(\\)<>@,;:\\\\\"/\\[\\]\\?=\\{\\} \t";
	
	//token          = 1*<any CHAR except CTLs or separators>
	public static final String TOKEN = "[" + CHAR + "&&[^" + CTL + SEPARATORS + "]]+";
	
	//LWS = [CRLF] 1*( SP | HT )
	public static final String LWS = "(\\r\\n)?[\\x20\\x09]+";
	
	//TEXT           = <any OCTET except CTLs,   but including LWS>
	public static final String TEXT = "[^" + CTL + "]|(" + LWS + ")";
	
	//quoted-pair    = "\" CHAR
	public static final String QUOTED_PAIR = "\\\\" + CHAR;
	
	//ctext          = <any TEXT excluding "(" and ")">
	public static final String CTEXT = "[^" + CTL + "\\(\\)]|(" + LWS + ")";
	
	//comment        = "(" *( ctext | quoted-pair | comment ) ")"
	private static final String COMMENT_ = "[(]((" + CTEXT + ")|" + QUOTED_PAIR + ")*[)]";
	public static final String COMMENT = "[(]((" + CTEXT + ")|" + QUOTED_PAIR + "|" + COMMENT_ + ")*[)]";
	
	
	//Date format
	public static final String MONTH = "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec";
	private static final String WEEKDAY = "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday";
    private static final String WKDAY = "Mon|Tue|Wed|Thu|Fri|Sat|Sun";
    private static final String TIME = "\\d{2}:\\d{2}:\\d{2}";
    private static final String DATE3 = "(" + MONTH + ") ( |\\d)\\d";
    private static final String DATE2 = "\\d{2}-(" + MONTH + ")-\\d{2}";
    private static final String DATE1 = "\\d{2} (" + MONTH + ") \\d{4}";
    public static final String ASCTIME_DATE = "(" + WKDAY + ") (" + DATE3 + ") (" + TIME + ") \\d{4}";
    public static final String RFC850_DATE = "(" + WEEKDAY + "), (" + DATE2 + ") (" + TIME + ") GMT";
    public static final String RFC1123_DATE = "(" + WKDAY + "), (" + DATE1 + ") (" + TIME + ") GMT";
    public static final String HTTP_DATE = "(" + RFC1123_DATE + ")|(" + RFC850_DATE + ")|(" + ASCTIME_DATE + ")";
}
