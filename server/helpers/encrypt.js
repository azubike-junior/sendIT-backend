import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
    const rounds = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, rounds)
}

export const comparePassword = async (password, hash) => {
    const equals = bcrypt.compare(password, hash);
    return Promise.resolve(equals);
};