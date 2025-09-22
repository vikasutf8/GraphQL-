
import startServer from './app';
import dotenv from 'dotenv';

dotenv.config();

async function init() {
    const app = await startServer();

    app.listen(process.env.PORT || 4000, () => {
        console.log(`🚀 Server ready at: http://localhost:${process.env.PORT || 4000}/graphql`);
    });
}

init();