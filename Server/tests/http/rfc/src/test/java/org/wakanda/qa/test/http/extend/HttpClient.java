package org.wakanda.qa.test.http.extend;

import java.io.IOException;

import org.apache.http.ConnectionReuseStrategy;
import org.apache.http.HttpClientConnection;
import org.apache.http.HttpException;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpRequestInterceptor;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.impl.DefaultConnectionReuseStrategy;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.params.HttpParams;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.params.DefaultedHttpParams;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.HttpContext;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.ExecutionContext;
import org.apache.http.protocol.HttpProcessor;
import org.apache.http.protocol.HttpRequestExecutor;
import org.apache.http.protocol.ImmutableHttpProcessor;
import org.apache.http.protocol.RequestConnControl;
import org.apache.http.protocol.RequestContent;
import org.apache.http.protocol.RequestExpectContinue;
import org.apache.http.protocol.RequestTargetHost;
import org.apache.http.protocol.RequestUserAgent;

public class HttpClient {

    private final HttpParams params;
    private final HttpProcessor httpproc;
    private final HttpRequestExecutor httpexecutor;
    private final ConnectionReuseStrategy connStrategy;
    private final HttpContext context;

    public HttpClient() {
        super();
        this.params = new SyncBasicHttpParams();
        this.params
            .setIntParameter(CoreConnectionPNames.SO_TIMEOUT, 5000)
            .setBooleanParameter(CoreConnectionPNames.STALE_CONNECTION_CHECK, false)
            .setParameter(CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1)
            .setParameter(CoreProtocolPNames.USER_AGENT, "TEST-CLIENT/1.1");
        this.httpproc = new ImmutableHttpProcessor(
                new HttpRequestInterceptor[] {
                        new RequestContent(),
                        new RequestTargetHost(),
                        new RequestConnControl(),
                        new RequestUserAgent(),
                        new RequestExpectContinue()
                });
        this.httpexecutor = new HttpRequestExecutor();
        this.connStrategy = new DefaultConnectionReuseStrategy();
        this.context = new BasicHttpContext();
    }

    public HttpParams getParams() {
        return this.params;
    }

    public HttpResponse execute(
            final HttpRequest request,
            final HttpHost targetHost,
            final HttpClientConnection conn) throws HttpException, IOException {
        this.context.setAttribute(ExecutionContext.HTTP_REQUEST, request);
        this.context.setAttribute(ExecutionContext.HTTP_TARGET_HOST, targetHost);
        this.context.setAttribute(ExecutionContext.HTTP_CONNECTION, conn);

        request.setParams(new DefaultedHttpParams(request.getParams(), this.params));
        this.httpexecutor.preProcess(request, this.httpproc, this.context);
        HttpResponse response = this.httpexecutor.execute(request, conn, this.context);
        response.setParams(new DefaultedHttpParams(response.getParams(), this.params));
        this.httpexecutor.postProcess(response, this.httpproc, this.context);
        return response;
    }

    public boolean keepAlive(final HttpResponse response) {
        return this.connStrategy.keepAlive(response, this.context);
    }

}
