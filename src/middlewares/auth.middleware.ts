import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import axios from 'axios';
let pems = {};

class AuthMiddleware {
	private poolRegion: string = 'us-east-1';
	private userPoolId: string = 'us-east-1_cPTf2RuK5';

	constructor() {
		this.setUp();
	}

	verifyToken(req: Request, res: Response, next: NextFunction): void {
		const token = req.headers.authorization?.split(' ').slice(1);
		if (!token) res.status(401).end();

		let decodeJwt: any = jwt.decode(String(token), { complete: true });
		if (!decodeJwt) {
			res.status(401).end();
		}

		let kid = decodeJwt.header.kid;
		let pem = pems[kid];

		if (!pem) {
			res.status(401).end();
		}

		jwt.verify(String(token), pem, (err, payload) => {
			if (err) {
				res.status(401).end();
			}
			next();
		});
	}

	private async setUp() {
		const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

		try {
			const response = await axios.get(URL);
			if (response.status !== 200) {
				throw `Request not successful`;
			}
			const data = response.data;
			const { keys }: any = data;
			for (let index = 0; index < keys.length; index++) {
				const key = keys[index];
				const key_id = key.kid;
				const modulus = key.n;
				const exponent = key.e;
				const key_type = key.kty;
				const jwk = { kty: key_type, n: modulus, e: exponent };
				const pem = jwkToPem(jwk);
				pems[key_id] = pem;
			}
			console.log('got all pems');
		} catch (error) {
			console.log('Could not fetch jwks');
		}
	}
}

export default AuthMiddleware;
