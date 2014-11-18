/**
 * 
 */
package org.wakanda.qa.test.http;

import java.io.File;
import java.io.IOException;
import java.util.Random;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.Header;
import org.apache.http.HeaderIterator;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.message.BasicLineFormatter;

/**
 * @author ouissam.gouni@4d.com
 *
 */
public class Utils{
	
	public static final String CRLF = "\r\n";
	
	public static String toString(HttpRequest request) {
		StringBuffer result = new StringBuffer();
		BasicLineFormatter lineFormatter = BasicLineFormatter.DEFAULT;

		result.append(lineFormatter.formatRequestLine(null,
				request.getRequestLine()));
		result.append(CRLF);

		HeaderIterator it = request.headerIterator();
		while (it.hasNext()) {
			Header header = it.nextHeader();
			result.append(lineFormatter.formatHeader(null, header));
			result.append(CRLF);
		}
		result.append(CRLF);
		return result.toString();
	}

	public static String toString(HttpResponse response) {
		StringBuffer result = new StringBuffer();
		BasicLineFormatter lineFormatter = BasicLineFormatter.DEFAULT;

		result.append(lineFormatter.formatStatusLine(null,
				response.getStatusLine()));
		result.append(CRLF);

		HeaderIterator it = response.headerIterator();
		while (it.hasNext()) {
			Header header = it.nextHeader();
			result.append(lineFormatter.formatHeader(null, header));
			result.append(CRLF);
		}
		result.append(CRLF);
		return result.toString();
	}
	
	public static String generateBoundary() {
		StringBuilder buffer = new StringBuilder();
		Random rand = new Random();
		int count = rand.nextInt(11) + 30; // a random size from 30 to 40
		for (int i = 0; i < count; i++) {
			buffer.append(MediaTypeUtil.MULTIPART_CHARS[rand.nextInt(MediaTypeUtil.MULTIPART_CHARS.length)]);
		}
		return buffer.toString();
	}
	
	/**
	 * Creates a text file with a random content of the given size.
	 * 
	 * @param path
	 * @param size
	 * @return
	 */
	public static boolean createRandomContent(String path, int size) {
		File file = new File(path);
		String data = RandomStringUtils.randomAscii(size);
		try {
			FileUtils.writeStringToFile(file, data);
		} catch (IOException e) {
			return false;
		}
		return true;

	}

}
