const express = require( 'express' );
const mongoose = require( 'mongoose' );

const app = express();

app.use( express.json() );
app.use( express.urlencoded( {
  extended: false
} ) );
app.use( require( 'cors' )() );
mongoose.connect( 'mongodb://localhost:27017/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
} );


const todoSchema = mongoose.Schema( {
  Title: String,
  IsCompleted: Boolean
} );

const Todo = mongoose.model( 'Todo', todoSchema );

const router = express.Router();



router.get( '/todos', async ( req, res ) => {
  const todos = await Todo.find().exec();
  res.json(
    todos
  );
} )

router.post( '/todos', async ( req, res ) => {
  try {
    const {
      Title,
      IsCompleted
    } = req.body;

    const NewToDo = new Todo( {
      Title,
      IsCompleted
    } );
    const todo = await NewToDo.save();
    res.json( todo );
  } catch ( error ) {
    console.log( error );
    res.status( 400 ).json( error );
  }

} );

app.use( '/api', router );
mongoose.connection.on( 'connected', () => {
  app.listen( 3030, () => console.log( 'MiniApi running on port *3030' ) );
} );
