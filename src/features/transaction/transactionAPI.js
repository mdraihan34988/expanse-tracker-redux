import axios from "../../utils/axios";

export const getTransactions = async (type,search,pageNumber) => {
    let limit = 5;
    let queryString = `?_sort=id&_order=DESC&_page=${pageNumber}&_limit=${limit}`;

    if (search !== "") {
        queryString += `&q=${search}`;
    }

    if(type) {
        queryString += `&q=${type}`
    }

    const response = await axios.get(`/transactions${queryString}`);

    return response;
};

export const addTransaction = async (data) => {
    const response = await axios.post("/transactions", data);

    return response.data;
};

export const editTransaction = async (id, data) => {
    const response = await axios.put(`/transactions/${id}`, data);

    return response.data;
};

export const deleteTransaction = async ( id, pageNumber, typeFilter, search ) => {
    await axios.delete(`/transactions/${id}`);
    const transactions = await getTransactions(typeFilter,search,pageNumber);
    return transactions.data;
};
