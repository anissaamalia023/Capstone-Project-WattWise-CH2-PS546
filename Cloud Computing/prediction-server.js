const Hapi = require('@hapi/hapi');
const tf = require('@tensorflow/tfjs');


const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

server.route({
    method: 'POST',
    path: '/predict',
    handler: async (request, h) => {
        try {
            const inputData = request.payload.inputData;

            //load the model
            const model = await tf.loadLayersModel('./model.py');

            //prepare the input data as 2D array
            const new_data = tf.tensor2d(inputData);

            //make the predictions
            const predictions = await model.predict(new_data).data();
            
            return { 
                predictions: predictions,
                message: 'Welcome to our API' 
            };
        } catch (error) {
            console.error('Prediction error:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
});

const startServer = async () => {
    try {
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();