const router = require('express').Router()
const conn = require ('../connection/index')

//register user
router.post('/users/register', (req,res)=>{
    let {username, email, password, alamat} = req.body
    let sql = `INSERT INTO users (username, email, password, alamat, id_roles) VALUES('${username}', '${email}', '${password}', '${alamat}', 2)`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})

//login user
router.post('/login', (req, res)=>{

    let {username, password} = req.body

    const sql = `SELECT * FROM login WHERE username=${username} AND password =${password}`
    
    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })

})

//user order
router.post('/order', (req, res)=>{
    let {username, email} = req.body
    let sql = `INSERT INTO cart `

})

//user cart
router.get('/cart', (req,res)=>{

    let {id} = req.body
    let sql = `SELECT FROM cart where id_user = ${id}`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})

//user upload pembayaran
router.post('/pembayaran', (req, res)=>{

})


module.exports = router