import mongoose from 'mongoose';


export async function connect(){

   try{

    mongoose.connect(process.env.NEXT_MONGODB_CONNECTION_STRING)
    const connection = mongoose.connection;

    connection.on('connected',()=>{
        console.log('MongoDB connected');
    })

    connection.on('error',(error)=>{
        console.log(`MongoDB Failed: ${error}`);
        process.exit()
    })

   }catch(error){
     console.log(`DataBase Error : ${error}`)
   }

}