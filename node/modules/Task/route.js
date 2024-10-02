const express = require('express')
const router = express.Router()
const task_model = require('./task_model')
const middleware = require('../../middleware/headerValidator')

router.post('/tasks',function(req,res){
    const rules = {
        title: 'required',
        description: '',
        is_complete: ''
    }
    if(middleware.checkValidationRUles(request,response,rules)){
        task_model.add_task(req,function(code,msg,response){
            res.send({code,msg,response})
        });
    }
})

router.get('/tasks',function(req,res){
    task_model.get_task(req,function(code,msg,response){
        res.send({code,msg,response})
    });
})

router.get('/tasks/:id',function(req,res){
    task_model.fetch_task(req,function(code,msg,response){
        res.send({code,msg,response})
    });
})

router.put('/tasks/:id',function(req,res){
    task_model.put_task(req,function(code,msg,response){
        res.send({code,msg,response})
    });
})

router.delete('/tasks/:id',function(req,res){
    task_model.delete_task(req,function(code,msg,response){
        res.send({code,msg,response})
    });
})
module.exports = router;