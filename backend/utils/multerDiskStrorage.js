import multer from 'multer'
import crypto from 'crypto'

/**
 * this is for diskStorage that we will need
 * Its format is filename `${photoid}_${file.originalname}`
 * @param {string} destination 
 */
const diskstorage = (destination) => {
    if(!destination) throw new Error("Destination is required, diskStorage Utility")
    const diskstorage = multer.diskStorage({
        destination: function(req, file, cb) {
            return cb(null, destination)
        },
        filename: function(req, file, cb) {
            const photoid  = crypto.randomBytes(10).toString('hex')
            return cb(null, `${photoid}_${file.originalname}`)
        }
    })
    
    return diskstorage
}

export default diskstorage