import axios from "../../utils/axios";

export const getnumberOfTransactionsAPI = async ( search, type ) => {
    let queryString = ``;

    if (search !== "") {
        queryString += `&q=${search}`;
    }

    if(type) {
        queryString += `&q=${type}`
    }

    const response = await axios.get(`/transactions/?${queryString}`);

    return response.data;
};
