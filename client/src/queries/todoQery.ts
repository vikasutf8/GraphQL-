import { gql } from '@apollo/client';

export const GET_TODOS = gql`
#graphql

query GET_TODOS{
    todos{
        id
        todo
        complete
        created_at
    }
}
`;


export const CREATE_TODO = gql`
mutation CREATE_TODO($todo:String!){
    createTodo(todo:$todo){
        id
        todo
        completed
        created_at
    }
}
`;

export const UPDATE_TODO = gql`
mutation UPDATE_TODO($id:Int!,$todo:String!){
    updateTodo(id:$id,todo:$todo){
        id
        todo
        complete
        created_at
    }
}
`;

export const TOGGLE_COMPLETE = gql`
mutation TOGGLE_COMPLETE($id:Int!,$data:Boolean!){
    toggleComplete(id:$id,data:$data){
       message
    }
}
`;

export const DELETE_TODO = gql`
mutation DELETE_TODO($id:Int!){
    deleteTodo(id:$id){
        id
        todo
        complete
        created_at
    }
}
`;