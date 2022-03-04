import { ObjectId } from 'mongodb';
import { mongoConnect, closeClient } from '../../utils/db-connect';
const userAnswerHandler = async (req, res) => {
  const { quiz, userId } = req.body;

  if (req.method === 'POST') {
    const collection = await mongoConnect('users');
    // const [client, db] = await mongoConnect();
    // const usersCollection = db.collection('users');
    await collection.updateOne(
      {
        _id: ObjectId(userId),
      },
      { $push: { quizzes: quiz } }
    );

    // client.close();

    closeClient();
    res.status('201').json({ message: 'answers are submitted!' });
  }
};

export default userAnswerHandler;
