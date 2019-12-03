const router = require('express').Router()
const conn = require ('../connection/index')


//SHOW PRODUCT 
router.get('/products', (req, res)=>{

    let sql = `SELECT * from products`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})

//login user
router.post('/login', (req, res)=>{

    let {username, password} = req.body

    const sql = `SELECT id, username, role FROM login WHERE username = '${username}' AND password = '${password}'`
    
    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })

})

module.exports = router