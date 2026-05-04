const app = require('./app');
const connectDB = require('./configs/db')
import 'dotenv/config';


const port = process.env.PORT || 5000;


const startServer = async () => {
	await connectDB();

	app.listen(port, () => {
		console.log('The port listen on 5000!');
	});
};

startServer();