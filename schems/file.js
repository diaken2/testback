const {model,Schema}=require('mongoose')
const schema=new Schema({
    kandziword:{
        type:Object
    },
    photo:{
        type:Object
    }
})
module.exports=model("Todo", schema)