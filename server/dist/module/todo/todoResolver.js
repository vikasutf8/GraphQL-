import prisma from "../../config/database.js";
//this resolver query alway a function that return data or hit from database
const todoResolver = {
    Query: {
        todos: async () => await prisma.todo.findMany({ orderBy: { id: "desc" } }),
        getTodo: async (_, { id }) => await prisma.todo.findUnique({ where: { id: id } })
    },
    Mutation: {
        createTodo: async (_, { todo }) => {
            const newTodo = await prisma.todo.create({
                data: {
                    todo,
                    complete: false
                }
            });
            return newTodo;
        },
        updateTodo: async (_, { id, todo }) => {
            await prisma.todo.update({
                data: {
                    todo: todo
                },
                where: {
                    id: id
                }
            });
            return { message: "Todo updated Successfully" };
        },
        toggleComplete: async (__dirname, { id, data }) => {
            await prisma.todo.update({
                data: {
                    completed: data
                },
                where: {
                    id: id
                }
            });
            return { message: "Todo Updated Successfully" };
        },
        deleteTodo: async (_, { id }) => {
            await prisma.todo.delete({
                where: {
                    id: id
                }
            });
            return { message: "Todo Deleted Successfully" };
        }
    }
};
export default todoResolver;
