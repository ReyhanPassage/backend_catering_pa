const router = require('express').Router()
const conn = require ('../connection/index')

router.get('/products', (req, res)=>{

    let sql = `SELECT * from products`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})



module.exports = router