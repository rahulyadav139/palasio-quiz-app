import { mongoConnect, closeClient } from '../../utils/db-connect';
import { ObjectId } from 'mongodb';

const deleteUserAccount = async (req, res) => {
  const userId = req.body.userId;

  if (req.method === 'POST') {
    const collection = await mongoConnect('users');

    const user = await collection.deleteOne({ _id: ObjectId(userId) });

    res.status('201').json(user);

    closeClient();
  }
};

export default deleteUserAccount;
