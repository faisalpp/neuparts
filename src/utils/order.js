import Order from '@/models/order';
import NewsLetter from '@/models/newsLetter';
import User from '@/models/user';
import connect from '@/lib/db';
import bcrypt from 'bcrypt';

export const generateRandomPassword = () => {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';

    const allCharacters = lowerCaseLetters + upperCaseLetters + digits;

    // Ensure the password has at least one lowercase letter, one uppercase letter, and one digit
    let password = '';
    password += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length));
    password += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
    password += digits.charAt(Math.floor(Math.random() * digits.length));

    // Generate the remaining characters randomly to fill the length of the password
    const remainingLength = Math.floor(Math.random() * (22)) + 3; // ensures the length is between 6 and 25
    for (let i = 0; i < remainingLength; i++) {
        password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    // Shuffle the password to avoid predictable patterns
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}




// NEU-1
export const GetOrderNo = async () => {

try{
 await connect()  

 const latestOrder = await Order.findOne().sort({ createdAt: -1 });
 let ORDER_NO = 'NEU-1';
 if(latestOrder){
  const prevOrderNo = latestOrder.order_no.split('-')[1];
  ORDER_NO = parseInt(prevOrderNo) + 1
  return 'NEU-'+ORDER_NO;
 }
 return ORDER_NO;
}catch(error){
 return false;   
}
}


export const SubscribeNewsLetter = async (email) => {
 
 try{
  await connect()

  const isPrev = await NewsLetter.findOne({email:email})
  if(isPrev){
   return true;
  }

  const Subscribed = await NewsLetter.create({email:email})
  if(Subscribed){
    return true
  }
  return false;

 }catch(error){
   return false;
 }

}


export const CreateCustomer = async (obj) => {
 try{
  await connect()

  const findUser = await User.findOne({email:obj.email})
  if(findUser){
    return findUser._id
  }else{
    const hash = await bcrypt.hash(obj.password, 10);

    const newUser = await User.create({
     firstName: obj.firstName,
     lastName: obj.lastName,
     country: obj.country,
     phone: obj.phone,
     email: obj.email,
     password: hash,
    })
    if(newUser){
      //Todo : send password rest link to customer email
      return newUser._id
    }
    return false;
  }
 }catch(error){
    return false;
 }
}