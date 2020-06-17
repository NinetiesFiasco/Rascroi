const md5 = require('md5');

let encodeToken = function(part){
    return Buffer.from(JSON.stringify(part)).toString('base64');
}
let decodeToken = function(part){
    return JSON.parse(Buffer.from(part, 'base64').toString());
}
let controlSumm = function(body){
    let ctrlStr=process.env.SITE_TOKEN_SALT;
    for (let i=0;i<body.length;i++)
       ctrlStr += body[i];
    
    return md5(ctrlStr);
}

module.exports = {
    createToken: (user)=>{
        let head = {
            email: user.email,
            userFIO: user.fio
        }
        let body = {
           login: user.login,
           id: user._id,
           date: new Date()
        }
        let control = controlSumm(body);
        
        return encodeToken(head) + '.' + encodeToken(body) + '.' + control;
    },
    validateToken: (token)=>{
        if (!token)
            return false;
        parts = token.split('.');
        if (parts.length != 3)
            return false;
        let body = decodeToken(parts[1]);
        let control = parts[2];
        if (control !== controlSumm(body))
            return false;
            
        return {
            head: decodeToken(parts[0]),
            body: body,
            control: control
        };
    }
}
