import e from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'


export const createUploader = ( subFolder: string ) => {
  const storage = multer.diskStorage( {
    destination: ( req: e.Request, file: Express.Multer.File, callback: ( error: ( Error | null ), filename: string ) => void ) => {
      const uploadPath = path.resolve( __dirname, '..', 'uploads', subFolder )

      if ( ! fs.existsSync( uploadPath ) ) {
        fs.mkdirSync( uploadPath, { recursive: true } )
      }

      callback( null, uploadPath )
    },

    filename( req: e.Request, file: Express.Multer.File, callback: ( error: ( Error | null ), filename: string ) => void ) {
      const uniqueSuffix = Date.now() + '_' + Math.round( Math.random() * 1e9 )
      callback( null, `${ uniqueSuffix }${ path.extname( file.originalname ) }` )
    },
  } )
  return multer( { storage } )
}

