const taskSchema = require('../Schema/task_schema')
var Task = {
    add_task : async function(request,callback){
        try{
            let params = {
                title: request.body.title,
                description: request.body.description
            }
            let task = new taskSchema(params)
            const add_task = await task.save()
            callback(1,'Data added successfully',add_task)
        }catch(err){
            callback(0,'Something went wrong',err)
        }
       
    },

    put_task : async function(request,callback){
        try{
            let params = {
                title: request.body.title,
                description: request.body.description,
            }
            if(request.body.toggle){
                params = {
                    is_complete: request.body.is_complete
                }
            }
            let task_id = request.params.id
            let update_task = await taskSchema.findByIdAndUpdate(task_id,params,{ new: true })
            callback(1,'Data updated successfully',update_task)
        }catch(err){
            callback(0,'Something went wrong',err)
        }
       
    },

    delete_task : async function(request,callback){
        try{
            let task_id = request.params.id
            let delete_task = await taskSchema.findByIdAndDelete(task_id)
            callback(1,'Data deleted successfully',delete_task)
        }catch(err){
            callback(0,'Something went wrong',err)
        }
    },

    get_task: async function(request,callback){
        try{
            let task_list = await taskSchema.find()
            callback(1,'Task Lists',task_list)
        }catch(err){
            callback(0,'Something went wrong',err)
        }
    },
    
    fetch_task: async function(request,callback){
        try{
            let id = request.params.id
            let task_list = await taskSchema.findById(id)
            callback(1,'Task Lists',task_list)
        }catch(err){
            callback(0,'Something went wrong',err)
        }
    },
}

module.exports = Task