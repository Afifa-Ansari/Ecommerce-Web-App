import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology:true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`.bgYellow.bold);

    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1); //manually exit process and show error
    }
};

export default connectDB;