const Reportetopten = require('../../models/reportetopten');

let crearReporte = async (dataBusqueda) =>{
    try {
        console.log("ESTO ESTA FUNCIONANDO??");
        let actualizaReporte = (dataToRefresh) => {
            
            return new Promise((resolve, reject) => {
                console.log("es hora de actualizar");
                let date = dataToRefresh[0].date
                date.push(dataBusqueda.date)
                let id = dataToRefresh[0]._id
                let body = {
                    count: dataToRefresh[0].count + 1,
                    date: date
                }
                console.log(body);

                Reportetopten.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators: true
                }, (err, reporteActualizado) => {
                    console.log(reporteActualizado);
                err
                    ?
                    reject(err):

                    resolve(reporteActualizado)
                })


            })

        }

        let buscarReporte = (dataToFind) => {
            nombre = dataToFind.nombre;
            tipo = dataToFind.tipo;
            return new Promise((resolve, reject) => {

                console.log("BUSCAR EL REPORTE");
                
                Reportetopten.find({
                    nombre: nombre,
                    tipo: tipo
                }).exec((err, reporteBuscado) => {
                    if (err) {
                        return reject(err)
                    }
                    if (Array.isArray(reporteBuscado) && reporteBuscado.length) {
                        return resolve({
                            ok: true,
                            reporteBuscado
                        })
                    } else {
                        console.log("ESTO ES FALSE");

                        return resolve({
                            ok: false
                        })
                    }

                })
            })


        }
        let buscaReporte = await buscarReporte(dataBusqueda);


        
        if (buscaReporte.ok === false) {
            console.log('entre en false');
            console.log(`reporte ${buscaReporte}`);
            
            let dataToSave = new Reportetopten ({
                nombre: dataBusqueda.nombre,
                tipo: dataBusqueda.tipo,
                date: dataBusqueda.date,
                count: 1
                
            })
            dataToSave.save((err, dataGuardada)=>{
                if (err) {
                    return err
                };
                if (dataGuardada) {
                console.log(`guardó ${dataGuardada}`);

                    return true
                }
            })
        } else if (buscaReporte.ok === true) {
            let actualizareporte = await actualizaReporte(buscaReporte.reporteBuscado)
        }
        
    } catch (error) {
        console.log(error);
    }

}








module.exports = {
    crearReporte
}