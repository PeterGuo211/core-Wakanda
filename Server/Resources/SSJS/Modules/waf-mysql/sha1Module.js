/* Copyright (c) 4D, 2011
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

function getSHA1Path(){
    //var folder, moduleFolder, file, path;
    //folder = application.getWalibFolder();
    //folder = folder.parent;
    //
    //moduleFolder= folder.getURL();
    //moduleFolder += "Modules/waf-mysql/sha1.js";
    //
    //file = File(moduleFolder);
    //path = file.getPath();
    //
    //return path;

    var f = File(module.filename);
	
	return f.parent.path + 'sha1.js';
}

function rstr_sha(s){
    var path = getSHA1Path();
    include(path);

    return rstr_sha1(s);
}

exports.getToken = function (password, scramble) {
    var a, b, c, tok1, tok2, tok3;
    // Calculate the Scramble buffer of a password;
    // Ref: MySQL Source Code: libmysql/password.c.
    if (!password) {
        c = new Buffer(1);
        c.writeUInt8(0,0);
        return c;
    }
    tok1 = rstr_sha(password);
    tok2 = rstr_sha(tok1);
    tok3 = rstr_sha(scramble.toString('binary')  + tok2);
    a = new Buffer(tok3, 'binary');
    b = new Buffer(tok1, 'binary');
    var result = new Buffer(a.length);
    for (var i = 0; i < a.length; i ++){
        result[i] = (a[i] ^ b[i]);
    }

    return result;
}
