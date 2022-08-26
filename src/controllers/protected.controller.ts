import { Request, Response, Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';

class ProtectedController {
	public path = '/protected';
	public router = Router();
	private AuthMiddleware: AuthMiddleware;
	constructor() {
		this.AuthMiddleware = new AuthMiddleware();
		this.initRoutes();
	}

	private initRoutes() {
		this.router.use(this.AuthMiddleware.verifyToken);
		this.router.get('/secret', this.home);
	}

	home(req: Request, res: Response) {
		return res.send('The secret is cupcakes');
	}
}

export default ProtectedController;
