import logger from '../../logger/logger';

const ping = {};

ping.index = async (req, res) => {
    try{
        logger.info('responding to ping ...')
        res.send('Pong!')
    }
    catch (e) {
        logger.error('failed responding to ping ... ' + e);
        res.send('failed responding to ping ... ');
    }
}

export default ping;
