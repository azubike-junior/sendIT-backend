export const paginate = ({ numberOfPage, pageLimit }) => {
    const offset = (numberOfPage - 1) * pageLimit
    return {
        offset,
        limit: pageLimit
    }
}

export const getPage = (request) => {
    const { page, limit} = request;
    const numberOfPage = parseInt(page, 10) || 1;
    const pageLimit = parseInt(limit, 10) || 10;

    return {
        numberOfPage, pageLimit
    }
}

export const paginatePage = ({array, page}) => {
    const {offset, limit} = page
    return array.slice(offset, (offset + limit))
}