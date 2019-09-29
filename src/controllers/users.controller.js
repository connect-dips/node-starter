import logger from '../../logger/logger';
import User from '../models/users.model';

const user = {};

user.getAll = async (req, res) => {
    try{
        const users = await User.getAll();
        logger.info('Sending all users')
        res.status(200).send({
            status: 'OK',
            data: users,
            error: null
        });
    }
    catch (e) {
        logger.error('Failed getting users' + e);
        res.status(200).send({
            status: 'KO',
            data: [],
            error: e
        });
    }
}
user.addNew = async (req, res) => {
    let userToAdd = User(req.body);
    try {
        const newUser = await User.addUser(userToAdd);
        logger.info('Adding new user...');
        res.status(200).send({
            status: 'OK',
            data: newUser,
            error: null
        });
    }
    catch (e) {
        logger.error('Failed adding user' + e);
        res.status(200).send({
            status: 'KO',
            data: [],
            error: e
        });
    }
}

export default user;
