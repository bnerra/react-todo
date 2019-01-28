const todosController = require('../controllers').todos;

// const cors = require('cors');

module.exports = (app) => {

    // app.use(cors());

    app.get('/api', (req,res) => res.status(200).send({
        message: 'Welcome to the Todos API'
    }));

    // CREATE and LISTALL todos
    app.post('/api/todos', todosController.create);
    app.get('/api/todos', todosController.list);

    // GET, UPDATE, DELETE todos by todoId
    app.get('/api/todos/:id?', todosController.retrieve);
    app.put('/api/todos/:id?', todosController.update);
    app.delete('/api/todos/:id?', todosController.destroy);

    // For any other request method, return "Method Not Allowed"
    app.all('/api/todos/:todoId/items', (req, res) =>
        res.status(405).send({
            message: "Method Not Allowed"
        }));
};