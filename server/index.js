const express = require("express");
const cors = require("cors");
const ctrl = require('./controller')

const app = express();

app.use(express.json()); 
app.use(cors());


app.get('/api/role-models', ctrl.getAllModels);
app.delete('/api/role-models/:id', ctrl.deleteModel);
app.post('/api/role-models', ctrl.createModel);
app.put('/api/role-models/:id', ctrl.changeModelVotes);

app.listen(4000, () => {
    console.log('Listening on 4000!')
});