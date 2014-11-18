package org.wakanda.qa.test.http.extend;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import org.apache.http.impl.io.AbstractSessionInputBuffer;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;

/**
 * {@link org.apache.http.io.SessionInputBuffer} mockup implementation.
 */
public class SessionInputBufferMockup extends AbstractSessionInputBuffer {

    public static final int BUFFER_SIZE = 16;

    public SessionInputBufferMockup(
            final InputStream instream,
            int buffersize,
            final HttpParams params) {
        super();
        init(instream, buffersize, params);
    }

    public SessionInputBufferMockup(
            final InputStream instream,
            int buffersize) {
        this(instream, buffersize, new BasicHttpParams());
    }

    public SessionInputBufferMockup(
            final byte[] bytes,
            final HttpParams params) {
        this(bytes, BUFFER_SIZE, params);
    }

    public SessionInputBufferMockup(
            final byte[] bytes) {
        this(bytes, BUFFER_SIZE, new BasicHttpParams());
    }

    public SessionInputBufferMockup(
            final byte[] bytes,
            int buffersize,
            final HttpParams params) {
        this(new ByteArrayInputStream(bytes), buffersize, params);
    }

    public SessionInputBufferMockup(
            final byte[] bytes,
            int buffersize) {
        this(new ByteArrayInputStream(bytes), buffersize, new BasicHttpParams());
    }

    public SessionInputBufferMockup(
            final String s,
            final String charset,
            int buffersize,
            final HttpParams params)
        throws UnsupportedEncodingException {
        this(s.getBytes(charset), buffersize, params);
    }

    public SessionInputBufferMockup(
            final String s,
            final String charset,
            int buffersize)
        throws UnsupportedEncodingException {
        this(s.getBytes(charset), buffersize, new BasicHttpParams());
    }

    public SessionInputBufferMockup(
            final String s,
            final String charset,
            final HttpParams params)
        throws UnsupportedEncodingException {
        this(s.getBytes(charset), params);
    }

    public SessionInputBufferMockup(
            final String s,
            final String charset)
        throws UnsupportedEncodingException {
        this(s.getBytes(charset), new BasicHttpParams());

    }

    public boolean isDataAvailable(int timeout) throws IOException {
        return true;
    }

}
