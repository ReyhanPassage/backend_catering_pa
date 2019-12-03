const router = require('express').Router()
const conn = require ('../connection/index')


// add product
router.post('/admin/product', (req, res)=>{
    
    let {name, description, price}= req.body    
    let sql = `INSERT INTO products SET ? `
    let data = req.body
    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})

// delete product
router.delete('/admin/product/:id', (req,res)=>{

    let sql = `DELETE from products WHERE id = ${req.params.id}`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})
// update product
router.patch('/admin/product', (req,res)=>{

    let {name, description, price} = req.body
    let sql = `UPDATE product SET`

    conn.query(sql, (err, result)=>{
        if(err)return res.send(err)

        res.send(result)
    })
})



// acc pembayaran
router.post('/admin/invoices/:id_cart', (req, res)=>{

    let sql = `UPDATE orders SET is_paid = 1 WHERE id=${req.params.id_cart}`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})


// melihat orderan
router.get('/admin/orders', (req,res)=>{

    let sql= ``

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})


module.exports = router