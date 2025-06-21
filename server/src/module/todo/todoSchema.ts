
const todoSchema = `#graphql


scalar Date

type ResponseMsg {
    message :String
}
# data fielded in database
type Todo{
    id: Int!
    todo: String
    complete: Boolean
    created_at: Date
}

# to fetch data write query

type Query{
    todos: [Todo]
    getTodo(id:Int):Todo
}

# now create controller of above query that return data
# should be type
type Mutation {
    createTodo(todo:String):Todo
    updateTodo(id:Int,todo:String):ResponseMsg
    toggleComplete(id:Int, data:Boolean):ResponseMsg
    deleteTodo(id:Int):ResponseMsg
}

`

export default todoSchema;