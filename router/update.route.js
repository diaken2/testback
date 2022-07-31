const {Router}=require("express")
const fileMiddleware=require("../multer/file")
const imgbbUploader = require("imgbb-uploader");
const router=Router()
const Todo=require("../schems/file")
const Kandji=require("../schems/file")
router.post("/temme",async(req,res)=>{
    console.log("Подключено к бэкэнду")
    const todos=await Todo.find({})
    res.json(todos)
    
    
})


router.get("/", (req,res)=>{
console.log("hello")
})
router.post("/kandzichange",async(req,res)=>{
console.log(req.body)

Todo.updateOne({_id:req.body.idfor}, {kandziword:{
  kandzi:req.body.kandzifor,
  read:req.body.readorig,
  translate:req.body.transorig
}},()=>{
  console.log("Изменено")
});
})
router.post("/readchange",async(req,res)=>{
  console.log(req.body)
  Todo.updateOne({_id:req.body.idfor}, {kandziword:{
    kandzi:req.body.kandzifor,
    read:req.body.readorig,
    translate:req.body.transorig
  }},()=>{
    console.log("Изменено")
  })
})



router.post("/imagechange",fileMiddleware.single('avatar'),(req,res)=>{
  console.log("Подготовка к изменениям")
  console.log(req.body)
  console.log(req.file)
  imgbbUploader("5e71f03e6521ab68c9a55e6b59526aa3", req.file.path)
  .then((response) => {
    console.log(response.url)
    Todo.updateOne({_id:req.body.idfor}, {photo:response.url},()=>{
      console.log("Изменено")
    })
  })
  .catch((error) => console.error(error));
  res.json(req.body)
})





router.post("/translatechange",async(req,res)=>{
  console.log(req.body)
  Todo.updateOne({_id:req.body.idfor}, {kandziword:{
    kandzi:req.body.kandzifor,
    read:req.body.readorig,
    translate:req.body.transorig
  }},()=>{
    console.log("Изменено")
  })
  res.json(req.body)
})
// router.post('/create2',fileMiddleware.single('avatar'), (req,res)=>{
//     console.log("Файл", req.file)
//     res.json(req.file)
// })

router.post('/delete', (req,res)=>{
  console.log("Файл удален")
  console.log(req.body)
  Todo.findOneAndDelete({_id:req.body.idfor},()=>{
    console.log("Всё удалилось")
  })
  res.json(req.body)
})



router.post('/create',fileMiddleware.single('avatar'),(req,res)=>{
console.log("Подключение к серверу прошло успешно")
console.log(req.body)
console.log(req.file)



imgbbUploader("5e71f03e6521ab68c9a55e6b59526aa3", req.file.path)
  .then(async(response) => {
    console.log(response.url)
    const todo = new Todo({
        kandziword:req.body,
        photo:response.url
    })
    await todo.save()
  })
  .catch((error) => console.error(error));


res.json(req.body)

})
module.exports=router
