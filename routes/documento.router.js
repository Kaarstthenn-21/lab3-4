const express = require('express');
const documento = require('./../schemas/documento.schema');
const app = express();

app.get('/api/v1/documentos/', async (req, res, next) => {
  try {
    const documentos = await documento.find({}).lean();
    res.render('documents', {
      documentos
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/v1/documentos/', async (req, res, next) => {
  const documentCreate = new documento(req.body);
  try {
    await documentCreate.save();
    res.json(documentCreate);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.patch('/api/v1/documentos/:id', async (req, res, next) => {
  try {
    await documento.findByIdAndUpdate(req.params.id, req.body);
    await documento.save();
    res.json("Actualizado correctamente");
  } catch (err) {
    res.json(err);
  }
});
app.delete('/api/v1/documentos/:id', async (req, res, next) => {
  try {
    const documentDelete = await documento.findByIdAndDelete(req.params.id)

    if (!documentDelete) res.status(404).send({
      status: 0,
      message: "Not Found"
    });
    res.status(200).send({
      status: 1,
      message: "Messages available"
    });
  } catch (err) {
    res.status(500).send();

  }
});
module.exports = app;