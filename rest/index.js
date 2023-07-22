const path = require('path');
const express = require('express');
const {v4:uuidv4} =require('uuid');
const methodOverride = require('method-override');
const app = express();


app.use(express.json());
//middleware yang digunakan untuk menangani data yang dikirim melalui formulir HTML dengan metode POST atau PUT.
app.use(express.urlencoded({extended:true})) ;

app.use(methodOverride('_method'));

//path.join(__dirname, 'views') digunakan untuk menggabungkan direktori saat ini (__dirname) dengan subdirektori 'views'//
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs') //set mesin rendering tampilan pake ejs//




const comments = [
    {
        id: uuidv4(),
        username: 'micahel',
        text: 'cekekceckekckcekcekcekckeckeckekcek'
    },
    {
        id: uuidv4(),
        username: 'micahel 2',
        text: 'cek2df2fdf2caf2scfr2fcf2cf2'
    },
    {
        id: uuidv4(),
        username: 'micahel 3',
        text: 'cekek3fsk3ksfbjdsfbk3ckekcek'
    },
    {
        id: uuidv4(),
        username: 'micahel 4',
        text: 'nfefn4nfsfn4skcnsdnf4lyplpty4'
    }
]


app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})
app.get('/comments/create',(req,res)=>{
    res.render('comments/create')
})
app.post('/comments', (req,res)=>{
    const {username,text} = req.body
    // console.log({username,text})
    comments.push({username,text,id:uuidv4()})
    res.redirect('/comments')
})
app.get('/comments/:id',(req,res)=>{
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show',{comment})
})
app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit',{comment})
})
app.patch('comments/:id',(req,res) => {
    const {id} = req.params
    const newComment = req.body.text
    const foundComment = comments.find(c =>c.id ===id)
    foudComment.text = newComment
    res.redirect("/comments")
});







app.get('/order',(req,res)=>{
    res.send('GET order response')
})
app.post('/order',(req,res)=>{
    const {username, number} = req.body;
    res.send(`${username} - ${number}`);
})




app.listen(8080,() => {
    console.log ("server is running on: http://localhost:8080");
});