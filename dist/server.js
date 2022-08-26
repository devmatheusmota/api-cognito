'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const app_1 = __importDefault(require('./app'));
const home_controller_1 = __importDefault(
	require('./controllers/home.controller')
);
const auth_controller_1 = __importDefault(
	require('./controllers/auth.controller')
);
const protected_controller_1 = __importDefault(
	require('./controllers/protected.controller')
);
const body_parser_1 = __importDefault(require('body-parser'));
const app = new app_1.default({
	port: 3000 || process.env.PORT,
	controllers: [
		new home_controller_1.default(),
		new auth_controller_1.default(),
		new protected_controller_1.default(),
	],
	middlewares: [
		body_parser_1.default.json(),
		body_parser_1.default.urlencoded({ extended: true }),
	],
});
app.listen();
//# sourceMappingURL=server.js.map
