import { mongoConnect, closeClient } from '../../utils/db-connect';
import { ObjectId } from 'mongodb';

const getQuiz = async (req, res) => {
  const quizId = req.body.quizId;

  if (req.method === 'POST') {
    const collection = await mongoConnect('quizzes');

    const quiz = await collection.findOne({ _id: ObjectId(quizId) });

    closeClient();

    res.status('201').json(quiz);
  }
};

export default getQuiz;
