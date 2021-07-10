const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require("dotenv")

dotenv.config({ path:__dirname+'/.env' });

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/build')));

function middlewareValidationForm(req,res,next){
    if(req.body.nome===''){
        res.json({message:"error"})
    }
    if(req.body.hospital===''){
        res.json({message:"error"})
    }
    if(req.body.descricao===''){
        res.json({message:"error"})
    }
    next()
}
app.get("/patients",async (req,res)=>{
    db.query("SELECT * FROM pacientes",(error,results)=>{
        if (error) throw error;
        res.json({results})
    }) 
})

app.post("/add", (req,res)=>{
    db.query(`INSERT INTO pacientes (nome, hospital, descricao) VALUES ('${req.body.nome}', '${req.body.hospital}', '${req.body.descricao}');`,
    (error,results)=>{
        if (error) throw error;
    }) 
    console.log(req.body)
    res.status(200).end()
})

app.delete("/delete", (req,res)=>{
    db.query(`DELETE FROM pacientes WHERE id=${req.body.id};`,
    (error,results)=>{
        if (error) throw error;
    })

    res.status(200).end()
})

app.post("/update", (req,res)=>{
    db.query(`
    UPDATE pacientes
    SET nome = 'pedro', hospital = '${req.body.hospital}', descricao = 'ffff'
    WHERE id = ${req.body.id}`,
    (error,results)=>{
        if (error) throw error;
    })
    console.log(req.body)
    res.status(200).end()
})

app.listen(3001, ()=>{
    console.log("listening on http://localhost:3001")
})

