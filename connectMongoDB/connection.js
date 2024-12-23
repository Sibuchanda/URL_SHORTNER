import mongoose from 'mongoose';


async function connectMongoDB(connectUrl){
    return mongoose.connect(connectUrl);
}

export default connectMongoDB;