const {Router} = require('express')
const toDoModel = require('../model/notes')
const isAuth =  require('../middleware/auth')
let router = Router()

router.post("/add", isAuth,  async (req, res) => {
    const {title, owner, view, noteId} = req.body;
    const note = new toDoModel({
        noteId,
        title,
        owner,
        view
    })

    note.save()
})

router.get('/', isAuth, async (req, res) => {
    const {owner} = req.query
    let list = await toDoModel.find({owner: owner})
    res.json(list)
})

router.delete('/:id', isAuth,  async (req, res) => {
    const {id} = req.params
    try {
        let list = await toDoModel.deleteOne({noteId: id})
        if (list) res.json({msg: `item with ${id} was delete`})
    } catch (e) {
        console.error(e.message)
    }
})

router.put('/:id', isAuth,  async (req, res) => {
    const {id} = req.params
    const {note} = req.body
    const editedElem = await toDoModel.findOneAndUpdate({noteId: id}, {$set: {title: note.title}} )
    res.json({msg: `${editedElem}`})
})

module.exports = router