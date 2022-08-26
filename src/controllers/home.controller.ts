import { Request, Response, Router } from 'express';

class HomeController {
	public path = '/';
	public router = Router();
	constructor() {
		this.initRoutes();
	}

	private initRoutes() {
		this.router.get('/', this.home);
	}

	home(req: Request, res: Response) {
		return res.send('Sucess!');
	}
}

export default HomeController;
