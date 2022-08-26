import AWS from 'aws-sdk';
import crypto from 'crypto';

class CognitoService {
	private config = {
		region: 'us-east-1',
	};

	private secretHash: string =
		'7c9eg5h8a7442ch53ga8dal44jp2obdrpjo7drukdeksi7pe2f';
	private clientId: string = '6g1aq74o711b6n273ntgeb2ucm';
	private cognitoIdentity: AWS.CognitoIdentityServiceProvider;

	constructor() {
		this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
	}

	public async signUpUser(
		username: string,
		password: string,
		userAttr: Array<any>
	): Promise<boolean> {
		const params = {
			ClientId: this.clientId,
			Password: password,
			Username: username,
			SecretHash: this.generateHash(username),
			UserAttributes: userAttr,
		};
		try {
			const data = await this.cognitoIdentity.signUp(params).promise();
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	public async verifyAccount(username: string, code: string): Promise<boolean> {
		const params = {
			ClientId: this.clientId,
			ConfirmationCode: code,
			SecretHash: this.generateHash(username),
			Username: username,
		};
		try {
			const data = await this.cognitoIdentity.confirmSignUp(params).promise();
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	public async signInUser(
		username: string,
		password: string
	): Promise<boolean> {
		const params = {
			AuthFlow: 'USER_PASSWORD_AUTH',
			ClientId: this.clientId,
			AuthParameters: {
				USERNAME: username,
				PASSWORD: password,
				SECRET_HASH: this.generateHash(username),
			},
		};

		try {
			const data = await this.cognitoIdentity.initiateAuth(params).promise();
			console.log({ 'Acess Token': data.AuthenticationResult?.AccessToken });
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	private generateHash(username: string): string {
		return crypto
			.createHmac('SHA256', this.secretHash)
			.update(username + this.clientId)
			.digest('base64');
	}
}

export default CognitoService;
