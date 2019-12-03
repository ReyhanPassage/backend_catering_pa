const router = require('express').Router()
const conn = require('../connection/index')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const bcryptjs = require('bcryptjs')


//deklarasi path upload directory
const uploadDirectory = path.join(__dirname, '/../../public/uploads/')

//setting upload destination dan upload file name
const _storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadDirectory)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + req.params.username + '-' + file.fieldname + path.extname(file.originalname))
    }
})

//setting multer
const upload = multer({
    storage: _storage,
    limits: {
        fileSize : 1000000 // Byte, max 1MB
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){ // will be error if the extension name is not one of these
            return cb(new Error('Please upload image file (jpg, jpeg, or png)')) 
        }

        cb(undefined, true)
    }
})

//register user
router.post('/users', (req,res)=>{
    let {id, nama, username, email, password, alamat} = req.body
    let sql = `INSERT INTO users (id, username, nama, email, password, alamat, id_role) VALUES(${id}, '${username}','${nama}', '${email}', '${password}', '${alamat}', 2)`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})



//update user avatar, name dan email

router.patch('/users/:username', upload.single('avatar'),(req, res) => {
    let sql = `SELECT avatar FROM users WHERE username = '${req.params.username}'`
    let sql2 = `UPDATE users SET ? WHERE username = ?`
    let data = [req.body, req.params.username]
    // req.body {name, email} / {name, email, password}
    // req.file = undefined / {filenaame, ...}

    if(data[0].password == ''){
        delete data[0].password
    }

    if(data[0].password){
        data[0].password = bcryptjs.hashSync(data[0].password, 8);
    }
    
    // Setiap kali mengupload avatar baru, kita akan hapus avatar yang lama 

    conn.query(sql, data, (err, result) => {
        if(err) return res.send(err)

        if(result[0].avatar){
            let avatarName = result[0].avatar
            let imgPath = `${uploadDirectory}${avatarName}`
            fs.unlinkSync(imgPath)
        }
        res.send(req.file)
        
    })


})

//user order
router.post('/order', (req, res)=>{
    let {username, email, qty} = req.body
    let sql = `INSERT INTO order (id_user) VALUES ()`

    conn.query(sql, (err, result)=>{

        if(err) return res.send(err)

        res.send(result)
    })

})

//user show cart
router.get('/cart', (req,res)=>{

    let {id} = req.body
    let sql = `SELECT * FROM cart where id_user = ${id}`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)
        
        res.send(result)
    })
})

//user upload pembayaran
router.post('/pembayaran', (req, res)=>{

    let {} = req.body
    let sql = 'INSERT INTO pembayaran VALUES SET ?'

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})


module.exports = router