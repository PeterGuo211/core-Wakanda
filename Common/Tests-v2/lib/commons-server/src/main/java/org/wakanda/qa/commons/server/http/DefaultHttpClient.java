/**
 * 
 */
package org.wakanda.qa.commons.server.http;

import org.apache.http.HttpVersion;
import org.apache.http.client.protocol.RequestAddCookies;
import org.apache.http.client.protocol.RequestAuthCache;
import org.apache.http.client.protocol.RequestClientConnControl;
import org.apache.http.client.protocol.RequestDefaultHeaders;
import org.apache.http.client.protocol.RequestProxyAuthentication;
import org.apache.http.client.protocol.RequestTargetAuthentication;
import org.apache.http.client.protocol.ResponseProcessCookies;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.BasicHttpProcessor;
import org.apache.http.protocol.HTTP;
import org.apache.http.protocol.RequestContent;
import org.apache.http.protocol.RequestExpectContinue;
import org.apache.http.protocol.RequestTargetHost;
import org.apache.http.protocol.RequestUserAgent;
import org.apache.http.util.VersionInfo;

public class DefaultHttpClient extends org.apache.http.impl.client.DefaultHttpClient{
	@Override
	protected HttpParams createHttpParams() {
		HttpParams params = new SyncBasicHttpParams();
		HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
		HttpProtocolParams.setContentCharset(params,
				HTTP.DEF_CONTENT_CHARSET.name());
		HttpConnectionParams.setTcpNoDelay(params, true);
		HttpConnectionParams.setSocketBufferSize(params, 8192);

		// determine the release version from packaged version info
		final VersionInfo vi = VersionInfo.loadVersionInfo(
				"org.apache.http.client",
				DefaultHttpClient.class.getClassLoader());
		final String release = (vi != null) ? vi.getRelease()
				: VersionInfo.UNAVAILABLE;
		HttpProtocolParams.setUserAgent(params,
				"ouissam.gouni@4d.com (via Apache-HttpClient/"
						+ release + ")");
		return params;
	}

	@Override
	protected BasicHttpProcessor createHttpProcessor() {
		 BasicHttpProcessor httpproc = new BasicHttpProcessor();
	        httpproc.addInterceptor(new RequestDefaultHeaders());
	        // Required protocol interceptors
	        httpproc.addInterceptor(new RequestContent());
	        httpproc.addInterceptor(new RequestTargetHost());
	        // Recommended protocol interceptors
	        httpproc.addInterceptor(new RequestClientConnControl());
	        httpproc.addInterceptor(new RequestUserAgent());
	        httpproc.addInterceptor(new RequestExpectContinue());
	        // HTTP state management interceptors
	        httpproc.addInterceptor(new RequestAddCookies());
	        httpproc.addInterceptor(new ResponseProcessCookies());
	        // HTTP authentication interceptors
	        httpproc.addInterceptor(new RequestAuthCache());
	        httpproc.addInterceptor(new RequestTargetAuthentication());
	        httpproc.addInterceptor(new RequestProxyAuthentication());
	        return httpproc;
	}
}