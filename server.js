const express = require('express')
const app = express()
const uniqid = require('uniqid')
const fs = require('fs')
const path = require('path')
const sequelize = require('./models/db')
const multer = require('multer')
const upload = multer().single('file_upload')
const momentTimezone = require("moment-timezone")

const PORT = 9090
const BASE_DIR_UPLOADS = '/app/uploads'
const mime = require('mime')
const {TamuModel} = require('./models/tamu')

sequelize.sync()


app.use('/u',express.static('/app/uploads'))



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    next()
})



app.get('/api/tamu/:tamu_id/:date_in',async(req,res)=>{
    try{
        const gTamu = await TamuModel.findById(req.params.tamu_id)
        const filePath = path.join(gTamu.tamu_identity , req.params.date_in , gTamu.tamu_filename)
        const faceIdGTamu = fs.existsSync(path.join(BASE_DIR_UPLOADS , gTamu.tamu_identity , req.params.date_in , gTamu.tamu_filename))
        if(!faceIdGTamu){
            throw new Error('FILE_NOT_FOUND')
        }
        res.json({
            code:200,
            data:{
                ...gTamu,
                face_id:`/u/${filePath}`                
            }
        })
    }catch(ex){
        console.error(`${req.url}::${req.method}`,ex)
        res.status(500).json({
            code:500,
            data:'CANNOT_PROCEED_THIS_REQUEST'
        })
    }
})

app.delete('/api/tamu/:tamu_id',(req,res)=>{

})

app.post('/api/tamu/:tamu_id/out',(req,res)=>{
    TamuModel.update({
        tamu_time_out:new Date()
    },{
        where:{
            tamu_id:req.params.tamu_id
        }
    })
        .then(t=>{
            res.json({
                code:200,
                data:'PROCESS_SUCCESS'
            })
        })
        .catch(err=>{
            console.error(`${req.url}::${req.method}`,err)
            res.status(500).json({
                code:500,
                data:'CANNOT_PROCEED_THIS_REQUEST'
            })
        })
})

app.post('/api/tamu',upload,async(req,res)=>{
    const tamuUId = uniqid()
    const tamuFaceIdFileBuffer = req.file.buffer
    const tamuIdentity = req.body.tamu_identity
    const mNow = momentTimezone().tz('Asia/Jakarta')
    
    const tamu_name = req.body.tamu_name
    const tamu_gender = req.body.tamu_gender
    const tamu_phoneno = req.body.tamu_phoneno
    const tamu_purpose = req.body.tamu_purpose
    const tamu_date = mNow.format('YYYY-MM-DD')
    const tamu_time_in = mNow.format('hh:mm')
    const tamu_time_out  = null

    const tamuIdDir = `${BASE_DIR_UPLOADS}/${tamuIdentity}`


    const tamuIdDirExists = fs.existsSync(tamuIdDir)
    if (!tamuIdDirExists) {
        fs.mkdirSync(tamuIdDir)
    }


    const mDate = mNow.format('YYYY-MM-DD')


    const tamuDateDir = path.join(tamuIdDir , mDate)
    const tamuDateDirExists = fs.existsSync(tamuDateDir)
    if(!tamuDateDirExists) {
        fs.mkdirSync(tamuDateDir)
    }

    try {
        const fExt = mime.getExtension(req.file.mimetype)
        const tamu_filename = `${tamuUId}.${fExt}`
        fs.appendFileSync(path.join(tamuDateDir , tamu_filename),tamuFaceIdFileBuffer)
        const newTamu = {
            tamu_id:tamuUId,
            tamu_identity:tamuIdentity,
            tamu_name,
            tamu_date,
            tamu_gender,
            tamu_phoneno,
            tamu_purpose,
            tamu_time_in,
            tamu_time_out,
            tamu_filename
        }
        await TamuModel.create(newTamu)
        res.json({
            code:200,
            data:'PROCESS_SUCCESS'
        })
    } catch (ex) {
        console.error(`${req.url}::${req.method}`,ex)
        res.json({
            code:500,
            data:'CANNOT_PROCEED_THIS_REQUEST'
        })
    }


})


app.listen(PORT,()=> console.log(`listening on port ${PORT}`))