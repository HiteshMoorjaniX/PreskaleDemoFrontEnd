
const BASE_URL = 'http://localhost:8080';

class ApiService {
    
    getData() {
       return fetch(BASE_URL + '/getStore');
    }

    deleteDataById(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        };

        return fetch(BASE_URL + '/deleteStore/' + id, requestOptions);
    }

    updateById(id,data) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch(BASE_URL + '/updateStore/' + id, requestOptions);
    }

    getDataById(id) {
        return fetch(BASE_URL + '/getStoreById/' + id);
    }

    storeData(data) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch(BASE_URL + '/addStore', requestOptions);
    }
}

export default new ApiService();