import { mongoConnect, closeClient } from '../../utils/db-connect';

const getCategories = async (req, res) => {
  if (req.method === 'GET') {
    const collection = await mongoConnect('categories');

    const categories = await collection.find().toArray();

    closeClient();

    res.status('201').json(categories);
  }
};

export default getCategories;
