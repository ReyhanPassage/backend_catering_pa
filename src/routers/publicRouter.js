const router = require('express').Router()
const conn = require ('../connection/index')
const bcryptjs = require('bcryptjs')

//SHOW PRODUCT is done
router.get('/products', (req, res)=>{

    let sql = `SELECT * from products`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        res.send(result)
    })
})

//login user is done
router.post('/login', (req, res)=>{

    let {username, password} = req.body
    let sql = `SELECT * FROM login WHERE username = '${username}'`

    conn.query(sql, async (err, result) => {
        if(err) return res.send({error: err.message})
        // Jika user tidak ditemukan
        if(result.length == 0) return res.send({error: "User not found"})
        // User dipindahkan ke variabel, agar mudah dalam penggunaan
        let user = result[0]
        // Bandingkan password inputan dg yang ada di database, return true or false
        let hash = await bcryptjs.compare(password, user.password)
        // Jika hash bernilai false, kirim object error
        if(!hash) return res.send({error: "Wrong password"})
        // Apakah user sudah melakukan verifikasi
        //if(!user.verified) return res.send({error: "Please verification your email"})
        // Kirim user sebagai respon
        // user = {username, id}
        res.send(result)

    })





    // let {username, password} = req.body

    // const sql = `SELECT id, username, role FROM login WHERE username = '${username}' AND password = '${password}'`
    
    // conn.query(sql, (err, result)=>{
    //     if(err) return res.send(err)

    //     res.send(result)
    // })

})

module.exports = router