
const Zona = require('../../models/zona')


let findZona = (req, res, next) => {


    Zona.find()
    .exec( (err, zona) => {
        if(err) {
            console.log(err);
        }
        res.status(200).json({ok:true, zona });
    });

}


module.exports = {
    findZona
}