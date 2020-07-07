import {
    signUpSchema,
    signInSchema,
    updateProfileSchema
} from '../validation/validationSchema';
import {
    validateData
} from '../validation/validateData';
import {
    sendResponse
} from '../helpers/response';

export const validateInput = async (req, res, next) => {
    const schemas = {
        '/signup': signUpSchema,
        '/signin': signInSchema,
        '/updateProfile': updateProfileSchema
    }

    const validation = await validateData(req.body, schemas[`/${req.path.split('/').pop()}`]);

    if (validation.hasError) {
        return sendResponse(res, {
            statusCode: 400,
            message: validation.errors
        });
    }
    req.body = validation.fields;
    return next()
}