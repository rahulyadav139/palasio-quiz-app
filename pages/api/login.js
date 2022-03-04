import bcryptjs from 'bcryptjs';
import { mongoConnect, closeClient } from '../../utils/db-connect';
import { withSessionApi } from '../../utils/with-session';

const loginRoute = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const collection = await mongoConnect('users');

    const isUser = await collection.findOne({
      email: email,
    });

    if (!isUser) {
      closeClient();
      res.status('401').json({ message: 'User not found!', error: true });
      return;
    }

    const isMatched = await bcryptjs.compare(password, isUser.password);

    if (!isMatched) {
      closeClient();
      res.status('401').json({ message: 'Incorrect password', error: true });
      return;
    }

    req.session.user = {
      id: isUser._id.toString(),
      isAuthenticated: true,
    };

    await req.session.save();

    closeClient();

    res.status('201').json({ message: `welcome back`, error: false });
  }
};

export default withSessionApi(loginRoute);
