const fs=require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        let mes;
            try{
                mes=fs.readFileSync('./message.txt', 'utf8');
            }catch (error){
                mes='undefined'
            }
            res.write('<html>')
            res.write('<head><title>Home</title></head>')
            res.write('<body>')
            res.write(mes)
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>')
            res.write('</body>')
            res.write('</html>')
            return res.end();
        }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
        });
        req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports=requestHandler;