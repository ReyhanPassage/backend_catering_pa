const router = require('express').Router()
const conn = require ('../connection/index')
const fs = require('fs')

// add product is done
router.post('/admin/product', (req, res)=>{
    
    let {name, description, price}= req.body    
    let sql = `INSERT INTO products SET ? `
    let data = req.body
    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})

// delete product is done
router.delete('/admin/product/:id', (req,res)=>{

    let sql = `DELETE from products WHERE id = ${req.params.id}`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})

// update product is done
router.patch('/admin/product/:id', (req,res)=>{

    
    let sql = `UPDATE products SET ? where id = ?`
    let data = [req.body, req.params.id]
    conn.query(sql, data, (err, result)=>{
        if(err)return res.send(err)

        res.send(result)
    })
})

// add category is done
router.post('/admin/category', (req, res)=>{

    let sql= `INSERT INTO category SET ?`
    let data = req.body

    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)

    })
})

//show category is done

router.get('/admin/category', (req,res)=>{
    let sql = `SELECT * FROM category`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)

    })
})


// delete category is done
router.delete('/admin/category/:id_category', (req, res)=>{

    let sql = `DELETE FROM category where id= ${req.params.id_category}`

    conn.query(sql, (err, result)=>{
        if (err) return res.send(err)

        res.send(result)
    })
})

// update category is done
router.patch('/admin/category/:id_category', (req, res)=>{

    let data = [req.body, req.params.id_category]
    let sql = `UPDATE category SET ? WHERE id = ? `

    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)
        
        res.send(result)
    })
})

// add product-category is done
router.post('/admin/cat-prod', (req, res)=> {

    let data = req.body
    let sql = `INSERT INTO cat_prod SET ?`

    conn.query(sql, data , (err, result)=>{
        if(err) return res.send(err)

        res.send(result)

    })
})
// delete product-category is done
router.delete('/admin/cat-prod/:id_catprod', (req, res)=>{
    let sql = `DELETE FROM cat_prod where id = ${req.params.id_catprod}`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})

// show product-category is done
router.get('/admin/cat-prod', (req, res)=>{
    let sql = `SELECT * FROM category_product`

    conn.query(sql, (err,result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})

//update product-category is done
router.patch('/admin/cat-prod/:id_catprod', (req, res)=>{
    let data = [req.body, req.params.id_catprod]
    let sql = `UPDATE cat_prod SET ? WHERE id = ? `

    conn.query(sql, data, (err, result)=> {
        if(err) return res.send(err)

        res.send(result)
    })
})


// acc pembayaran
router.post('/admin/invoices/:id_cart', (req, res)=>{

    let rightNow = new Date()

    // tgl_bayar bisa diganti dengan DATENOW()
    let sql = `UPDATE orders SET tgl_bayar='${rightNow.getFullYear()}-${rightNow.getMonth()}-${rightNow.getDate()}' is_paid = 1 WHERE id=${req.params.id_cart}`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})


// melihat orderan
router.get('/admin/orders', (req,res)=>{

    let sql= `SELECT * FROM orderan_chart `

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})


module.exports = router