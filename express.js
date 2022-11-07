const express = require('express');
const app = express();

app.use(express.json());

var users = [
    {id :"1",fullname: "yavuz özbay", age :39, role: "admin"},
    {id :"2",fullname: "yavuz", age :3, role: "ad"},
    {id :"3",fullname: "yavuz özb", age :9, role: "min"}

]

app.get('/users', (req, res)=>{
    return res.status(200).json(users);
})

app.post('/create', (req, res)=>{
    const { fullname, age, role}= req.body;
    const newUser = {
        fullname,
        age,
        role
    };
    users.push(newUser);
})

app.delete('/:id', (req, res)=>{
    const id = req.params.id;
    users =users.filter((user)=> user.id !== id);

    return res.json(users);
})

app.get('/user/:id', (req, res)=>{
    const id = req.params.id;
    const {fullname} = req.body;

    users.forEach((user)=> {
        if (user.id===id){
            user.fullname = fullname;
        }
    })
    return res.json(users);
})

const port = 5000;
app.listen(port, ()=> {
    console.log(`localhost:${port} is active!`)
})