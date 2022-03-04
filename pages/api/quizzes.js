import { mongoConnect, closeClient } from '../../utils/db-connect';

const getQuizzes = async (req, res) => {
  const category = req.body.category;

  if (req.method === 'POST') {
    const collection = await mongoConnect('quizzes');

    const quizzes = await collection.find({ category: category }).toArray();

    res.status('201').json(quizzes);

    closeClient();
  }
};

export default getQuizzes;
