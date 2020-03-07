# passport-microsoft-authcode-example

An Example demonstrate working of https://github.com/shobhitsinghal624/passport-microsoft-authcode

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
$ git clone https://github.com/PRAJINPRAKASH/passport-microsoft-authcode-example.git
$ cd passport-microsoft-authcode-example
$ npm install


```

create openssl certificate if requierd https.

```bash

$ openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.cert -days 365
```

create OAuth 2.0 Client id client secret as described here `https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/v1-protocols-oauth-code` and update .env

Start the server.

```bash
$ npm run dev
```

create an oath code from the localhost:3000, don't forget to set redirect url host to localhost:3000.
** turn off ssl verification on postman to run this locally **

```http

curl --location --request POST 'https://localhost:3000/auth/microsoft/authcode' \
--header 'Content-Type: application/json' \
--data '{
	"code":"<placecode_here>"
}'



```

## Credits

- [Shobhit Singhal](https://github.com/shobhitsinghal624)
- [Jared Hanson](https://github.com/jaredhanson)
- [Maxim Yaskevich](https://github.com/myaskevich)
- [Thibault](https://github.com/melkir)

## License

(The MIT License)

Copyright (c) 2020 PRAJIN PRAKASH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
