import axios from "../../utils/axios";

export const getExpense = async () => {

    const response = await axios.get(`/transactions`);
    
    return response.data;
};
