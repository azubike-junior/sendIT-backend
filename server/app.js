import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';
import passport from 'passport'
import {
	passportfacebookConfiguration,
	passportGoogleConfiguration
} from './middlewares/passportAuth'

dotenv.config();
const PORT = process.env.PORT || 3040;
const app = express();
app.use(express.json());

app.use(passport.initialize())
app.use(passport.session())

passportGoogleConfiguration(passport)
passportfacebookConfiguration(passport)

app.use('/api/v1/', routes);

app.get('/', (req, res) => {
	res.json('app is working')
})

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});