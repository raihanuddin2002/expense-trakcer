import axios from "../../utils/axios";

export const getPaginationData = async (limit, pageNo, type, searchText) => {
    let queryString = '';
    (type !== '') ? queryString += `_sort=id&_order=desc&_page=${pageNo}&_limit=${limit}&type=${type}`
        : queryString += `_sort=id&_order=desc&_page=${pageNo}&_limit=${limit}`

    if (searchText !== "") queryString += `&name_like=${searchText.toLowerCase()}`

    const response = await axios.get(`/transactions?${queryString}`);

    return response.data;
};