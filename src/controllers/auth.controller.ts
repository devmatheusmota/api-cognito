import { CognitoIdentity } from 'aws-sdk';
import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import CognitoService from '../services/cognito.service';

class AuthController {
	public path = '/auth';
	public router = Router();
	constructor() {
		this.initRoutes();
	}

	private initRoutes() {
		this.router.post('/signup', this.validateBody('signUp'), this.signUp);
		this.router.post('/signin', this.validateBody('signIn'), this.signIn);
		this.router.post('/verify', this.validateBody('verify'), this.verify);
	}

	signUp(req: Request, res: Response) {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(422).json({ errors: result.array() });
		}
		const { username, password, email, name, family_name, birthdate } =
			req.body;
		const userAttr: object[] = [];

		userAttr.push({ Name: 'email', Value: email });
		userAttr.push({ Name: 'name', Value: name });
		userAttr.push({ Name: 'family_name', Value: family_name });
		userAttr.push({ Name: 'birthdate', Value: birthdate });

		console.log('Signup body is valid');

		const cognito = new CognitoService();
		const user = cognito
			.signUpUser(username, password, userAttr)
			.then((sucess) => {
				if (sucess) {
					res.status(200).end();
				} else {
					res.status(500).end();
				}
			});
	}

	async signIn(req: Request, res: Response) {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(422).json({ errors: result.array() });
		}

		const { username, password } = req.body;

		const cognito = new CognitoService();

		const user = await cognito.signInUser(username, password).then((sucess) => {
			if (sucess) {
				res.status(200).end();
			} else {
				res.status(500).end();
			}
		});
	}

	verify(req: Request, res: Response) {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(422).json({ errors: result.array() });
		}

		const { username, code } = req.body;

		const cognito = new CognitoService();
		cognito.verifyAccount(username, code).then((sucess) => {
			if (sucess) {
				return res.status(200).json({ message: 'Verification completed.' });
			} else {
				return res.status(500).json({ message: 'Something went wrong.' });
			}
		});
	}

	private validateBody(type: string): any {
		switch (type) {
			case 'signUp':
				return [
					body('username').notEmpty().isLength({ min: 6 }),
					body('email').notEmpty().normalizeEmail().isEmail(),
					body('password').isString().isLength({ min: 8 }),
					body('birthdate').exists().isISO8601(),
					body('name').notEmpty().isString(),
					body('family_name').notEmpty().isString(),
				];

			case 'signIn':
				return [
					body('username').notEmpty().isLength({ min: 6 }),
					body('password').isString().isLength({ min: 8 }),
				];

			case 'verify':
				return [
					body('username').notEmpty().isLength({ min: 6 }),
					body('code').isString().isLength({ min: 6, max: 6 }),
				];
		}
	}
}

export default AuthController;
