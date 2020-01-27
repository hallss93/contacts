import api from "./index";

const url = {
    contacts: "https://api.myjson.com/bins/18zrgm"
};

export default {
    getContacts: async () => {
        try {
            const response = await api.get(url.contacts);
            return response;
        } catch (error) {
            return error;
        }
    }
};
