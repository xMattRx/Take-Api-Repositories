import { Router } from 'express';
import { GithubController } from './controllers';

const routes = new Router()

routes.get('/',GithubController.getRepositories)

export default routes;
