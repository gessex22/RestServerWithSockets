const mongoose = require('mongoose')

const dbconection  = async() =>{

    try {
        
        await mongoose.connect(process.env.mongodbURL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,   Drecapited
        })

        console.log('bd online')

    } catch (error) {
        console.log('error en el despliegue de la db x1658')
        throw new Error('Error en el despliegue de la db x1658')
    }


}


module.exports = {

    dbconection
}