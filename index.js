const express=require('express');

const port=8000;
const path=require('path');
const db=require('./config/mongoose');
const TODO=require('./models/toddo');
const app=express();
app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded());
app.use(express.static('assets'))

app.get('/',function(req,res){
    TODO.find({},function(err,todos){
        if(err){console.log('error in finding the todo',err);return;}
        res.render('home',{
            title:"my todo",
            todo_list:todos
            

    });
 })
 
});
app.post('/create',function(req,res){
    TODO.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date
    },function(err,newTODO){
        if(err){console.log('error in creating a todo');return}
        console.log(newTODO);
        return res.redirect('back');
    });
app.get('/delete-task',function(req,res)
{
    console.log(req.query);
    var id=req.query;

    // to check the number of tasks to be deleted
    var count=Object.keys(id).length;
    for(let i=0;i<count;i++)
    {
        // deleting the task from the database by using their individual ids
        TODO.findByIdAndDelete(Object.keys(id)[i],function(err)
        {
            if(err)
            {
                console.log("error in deleting the task");
            }
        })
    }
    return res.redirect('back');
});



});
app.get('/delete-contact',function(req,res){
    console.log(req.body);
    /*let  id=req.query.id;
    TODO.findByIdAndDelete(id,function(err){
        if(err){console.log('error in deleting the database');return;}
        return res.redirect('back');
    })*/
   
});
app.post('/results',function(req,res){
    var checked=req.body.checked
    if (checked=="true"){
        let  id=req.query.id;
        TODO.findByIdAndDelete(id,function(err){
            if(err){console.log('error in deleting the database');return;}
            return res.redirect('back');
        })
    }else{
        console.log("false")
    }
})
app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('yup ! express is running on port',8000);
})