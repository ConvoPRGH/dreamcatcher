const binsRouter = require('express').Router();
const { getAllBins, getAllRequests, getOneBin, createNewBin } = require('../modules/psql_bins.js');

binsRouter.get('/', async (req, res) => {
  try {
    const data = await getAllBins();
    res.status(200).json(data.rows);
  } catch(e) {
    console.log('Error returning SQL', e.message);
  }
});

binsRouter.post('/', async (req, res) => {
  const { name } = req.body;
  console.log(req)
  try {
    console.log(req.body)
    const data = await createNewBin(name)
    res.status(201).json(data.rows);
  } catch(e) {
    console.log('Error creating new bin', e.message)
  }
})

// notesRouter.get('/', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes)
//   })
// })

// notesRouter.get('/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

// notesRouter.post('/', (request, response, next) => {
//   const body = request.body

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   })

//   note.save()
//     .then(savedNote => {
//       response.json(savedNote)
//     })
//     .catch(error => next(error))
// })

// notesRouter.delete('/:id', (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// notesRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

module.exports = binsRouter