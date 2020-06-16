import generateToken from './jwt';

export const passportResponse = ({
    dataValues
}) => {
    const {
        id,
        email,
        displayName
    } = dataValues

    return {
        id,
        email,
        displayName
    }
}