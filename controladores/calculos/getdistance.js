
// /* ***************************

// *	
// *	

// /* ***************************/


// let calculateDistance =(RSSIXe, mac)=>{
//     var a=10;
//     if(mac==meshUno[0].mac){a=0}
//     if(mac==meshUno[1].mac){a=1}
//     if(mac==meshUno[2].mac){a=2}
//     if(mac==meshUno[3].mac){a=3}
//     if(mac==''){a=4}
//     if(mac==''){a=5}
//     // var n=2;
//     // var A= -81.60688827298678;
//     // var C=10.43;
//     // var pot =( -RSSIXe + A + C) / (10*n);
//     // var distancia = Math.pow(10,pot);

//     var pot =( -RSSIXe + Cofing[a].rssiprom + Cofing[a].C) / (10*Cofing[a].n);
//     var distancia = Math.pow(10,pot);
//     console.log('***************')
//     console.log('Calculo de distance para Mac='+mac+'\nRssiXe= '+RSSIXe+'\nN= '+Cofing[a].n+'\nRssiProm= '+Cofing[a].rssiprom+'\nDesviacion= '+Cofing[a].C)
//     console.log(Cofing[a])

//     return distancia;
// }




// let distancia = async (req, res)  => {

//     let mac= req.mac;
//     let RSSIXe = req.rssi;
//     await ConstantesBeacon.find().limit(3).sort({_id:-1})
//     .exec(function (err, device) {
//         if (err) {console.log("ER_dataR_Ln:13")}
//         return( device);
      
    
//     });
    
//     console.log(`${constant}`);
//     let pot =( -RSSIXe + Cofing[a].rssiprom + Cofing[a].C) / (10*Cofing[a].n);
//     let distancia = Math.pow(10,pot);

//     return distancia;
// }




let distancia = () =>{


    RaspData.find().exec(function (err, device) {
        if (err) {console.log("ER_dataR_Ln:13")}
        return ( device);
  

    });
    console.log()
}

module.exports = {
    // calculateDistance,
    distancia
}
