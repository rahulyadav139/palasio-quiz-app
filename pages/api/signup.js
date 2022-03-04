import { mongoConnect, closeClient } from '../../utils/db-connect';
import bcryptjs from 'bcryptjs';

const signupHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { fullName, email, password } = req.body;
    const encryptedPassword = await bcryptjs.hash(password, 12);

    try {
      const collection = await mongoConnect('users');

      const isUserAlready = await collection.findOne({ email: email });
      console.log(isUserAlready);
      if (isUserAlready) {
        res.status('401').json({ message: 'User is already registered!' });
        closeClient();
        return;
      }

      const result = await collection.insertOne({
        fullName: fullName,
        email: email,
        password: encryptedPassword,
      });

      const userId = result.insertedId;

      closeClient();

      res.status('201').json({
        message: `new user is added with userID: ${userId}.`,
        status: 201,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default signupHandler;
