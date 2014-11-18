/**
 * 
 */
package org.wakanda.qa.test.http;

import java.io.UnsupportedEncodingException;
import java.util.BitSet;

import org.apache.commons.codec.CharEncoding;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.codec.net.URLCodec;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class WWWFormURLEncoder extends URLCodec {

	public static BitSet getDefaultSafeCharacters() {
		BitSet safeCharacters = new BitSet(256);
		for (int i = 'a'; i <= 'z'; i++) {
			safeCharacters.set(i);
		}
		for (int i = 'A'; i <= 'Z'; i++) {
			safeCharacters.set(i);
		}
		// numeric characters
		for (int i = '0'; i <= '9'; i++) {
			safeCharacters.set(i);
		}
		// special chars
		safeCharacters.set('-');
		safeCharacters.set('_');
		safeCharacters.set('.');
		safeCharacters.set('*');
		// blank to be replaced with +
		safeCharacters.set(' ');

		return safeCharacters;
	}
	
	public static String encode(String pString,BitSet urlsafe) throws UnsupportedEncodingException {
        if (pString == null) {
            return null;
        }
        return StringUtils.newStringUsAscii(encode(pString.getBytes(CharEncoding.UTF_8), urlsafe));
    }
	
	public static byte[] encode(byte[] bytes, BitSet urlsafe) {
        return encodeUrl(urlsafe, bytes);
    }
	
	public static String defaultEncode(String pString) throws UnsupportedEncodingException {
		return encode(pString,getDefaultSafeCharacters());
	}
}
