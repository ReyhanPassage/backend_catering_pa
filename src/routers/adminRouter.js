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

// add category
router.post('/admin/category', (req, res)=>{

    let sql= `INSERT INTO category VALUES SET ?`
    let data = req.body

    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)

    })
})


// delete category
router.delete('/admin/category/:id_category', (req, res)=>{

    let sql = `DELETE FROM category where id= ${req.params.id_category}`

    conn.query(sql, (err, result)=>{
        if (err) return res.send(err)

        res.send(result)
    })
})

// update category
router.patch('/category/:id_category', (req, res)=>{

    let data = req.body
    let sql = `UPDATE category SET ? `

    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)
        
        res.send(result)
    })
})

// add product-category
router.post('/admin/cat-prod', (req, res)=> {

    let data = req.body
    let sql = `INSERT INTO cat_prod VALUES SET ?`

    conn.query(sql, data , (err, result)=>{
        if(err) return res.send(err)

        res.send(result)

    })
})
// delete product-category
router.delete('/admin/cat-prod/:id_catprod', (req, res)=>{
    let sql = `DELETE FROM cat_prod where id = ${req.params.id_catprod}`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})


//update product-category
router.patch('./admin/catprod/:id_catprod', (req, res)=>{
    let data = req.body
    let sql = `UPDATE catprod SET ?`

    conn.query(sql, data, (err, result)=> {
        if(err) return res.send(err)

        res.send(result)
    })
})


// acc pembayaran
router.post('/admin/invoices/:id_cart', (req, res)=>{

    let rightNow = new Date()
    let sql = `UPDATE orders SET tgl_bayar='${rightNow.getFullYear()}-${rightNow.getMonth()}-${rightNow.getDate()}' is_paid = 1 WHERE id=${req.params.id_cart}`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})


// melihat orderan
router.get('/admin/orders', (req,res)=>{

    let sql= `SELECT * FROM order `

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})


module.exports = router