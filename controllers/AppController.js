// Request Handing
import redisClient from '../utils/redis';
import dbClientInstance from '../utils/db';

export default class AppController {
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClientInstance.isAlive(),
    });
  }

  static getStats(req, res) {
    Promise.all([dbClientInstance.nbUsers(), dbClientInstance.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}
