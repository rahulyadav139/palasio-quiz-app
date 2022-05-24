import { mongoConnect, closeClient } from '../../utils/db-connect';
import { ObjectId } from 'mongodb';

const deleteUserAccount = async (req, res) => {
  const userId = req.body.userId;

  if (userId === '62828d4c78b9e17312f3cb27') {
    res
      .status('404')
      .json({ message: 'You can not delete test account!', error: true });
    return;
  }

  if (req.method === 'POST') {
    const collection = await mongoConnect('users');

    const user = await collection.deleteOne({ _id: ObjectId(userId) });

    res.status('201').json(user);

    closeClient();
  }
};

export default deleteUserAccount;
