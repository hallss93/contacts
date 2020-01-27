import api from "./index";

const url = {
    contacts: "https://api.myjson.com/bins/7wgh2"
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
