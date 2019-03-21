const http = require('http'),
  url = require('url'),
  fs = require('fs');

// create the server with http and url to grab the URL.
http.createServer((request, response) => {
  var addr = request.url,
    results = url.parse(addr, true),
    filePath = '';

  // fs looks for the word documentation and returns the correct file.
  if (results.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Added to log.')
      }
    });

    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.write(data);
    response.end;
  });

}).listen(8080);