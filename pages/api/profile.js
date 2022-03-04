import { mongoConnect, closeClient } from '../../utils/db-connect';
import { ObjectId } from 'mongodb';
import bcryptjs from 'bcryptjs';

const updateProfile = async (req, res) => {
  const userId = req.body.userId;

  if (req.method === 'POST') {
    const collection = await mongoConnect('users');

    if (req.body.action === 'UPDATE-NAME') {
      const fullName = req.body.fullName;
      const data = await collection.updateOne(
        { _id: ObjectId(userId) },
        { $set: { fullName: fullName } }
      );

      res.status('201').json(data);

      closeClient();
    }

    if (req.body.action === 'UPDATE-PASSWORD') {
      const { oldPassword, newPassword } = req.body;

      const collection = await mongoConnect('users');

      const user = await collection.findOne({
        _id: ObjectId(userId),
      });

      const isMatched = await bcryptjs.compare(oldPassword, user.password);

      if (!isMatched) {
        closeClient();
        res
          .status('401')
          .json({ message: 'Incorrect current password', error: true });
        return;
      }

      const encryptedPassword = await bcryptjs.hash(newPassword, 12);
      const data = await collection.updateOne(
        { _id: ObjectId(userId) },
        { $set: { password: encryptedPassword } }
      );

      res
        .status('201')
        .json({ message: 'You have successfully changed your password!' });

      closeClient();
    }
  }
};

export default updateProfile;
