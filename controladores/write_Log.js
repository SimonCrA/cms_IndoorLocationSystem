const fs = require ('fs');
const colors = require ('colors')

let MakelogSistem = ( msg) => {

    return new Promise ( (resolve, reject) =>{

        let d = new Date();

        var datemake = d.getFullYear()  + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2) + "-" + ("0" + d.getHours()).slice(-2) + 
        "-" + ("0" + d.getMinutes()).slice(-2) + "-" + ("0" + d.getSeconds()).slice(-2) ;

        let mensaje = `${datemake}: ${msg}\n`
        
        fs.writeFile(`Logs/Log_${datemake}.txt`, mensaje, (err)=>{
            if(err) 
                reject(err)
            else
                resolve(`Logs/Log_${datemake}.txt`)


        })


    } )



}

let logSistem = (msg, name, type = 'Log')=> {
    console.log(msg);
    console.log(name);
        let d = new Date();


        var datemake = d.getFullYear()  + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2) + "-:" + ("0" + d.getHours()).slice(-2) + 
        ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) ;
        
        let mensaje = `\n${datemake} ${type}: ${msg}`

        
        fs.appendFile(name, mensaje, (err) => {
            if (err)  
            {
                console.log(err);
            }else{
                console.log(`The ${mensaje} was appended to file!`);

            }
          });
}

module.exports = {
logSistem,MakelogSistem
}