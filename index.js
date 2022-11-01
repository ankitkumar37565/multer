const express=require('express')
const fs=require('fs')
const port=2021
const app=express()
const multer=require('multer')
const storage=multer.diskStorage({
 filename:function(req,file,cb){
  const extra=Date.now()+'-'+Math.round(Math.random(1)*1E9)
  // cb(null,file.fieldname+'-'+extra)
  cb(null,file.originalname)
 },
 destination:function(req,file,cb){
  cb(null,'upload/')
 },
 buffer:function(req,file,cb){
  cb(null,'')
 }
})
const upload=multer({storage:storage})

app.post('/single',upload.single('avatar'),function(req,res,next){
 try{
  res.send(req.file)
 }
 catch(e){console.log(e)}
})

app.post('/bulk',upload.array('profiles',4),(req,res)=>{
 try{
  res.send(req.files)
 }catch(e){
  console.log(e)
  res.send(400)
 }
})

app.listen(port,()=>{
 console.log(`app running on port:${port}`)
})