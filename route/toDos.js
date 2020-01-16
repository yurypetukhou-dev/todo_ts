const {Router} = require('express')
const toDoModel = require('../model/notes')

let router = Router()

router.post("/add", async (req, res) => {
    const {title, owner, view} = req.body;
    const note = new toDoModel({
        title,
        owner,
        view
    })

    note.save()
})

router.get('/', async (req, res) => {
    const {owner} = req.query
    let list = await toDoModel.find({owner: owner})
    res.json(list)
    //send data
})
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    console.log(id)
    let list = await toDoModel.deleteOne({_id: id})
    if(list) res.json({msg: `item with ${id} was delete`})

})

module.exports = router