import env from "@/env/env";


export default class HttpClient {
    private apiUrl: string = env.apiUrl;

    public responseJson = {};

    public response = {};

    public body = {};

    public message = '';

    public status = 0;


    async get(url: string) {
        if (url.startsWith('/')) {
            url = url.substring(1);
        }

        return fetch(`${this.apiUrl}/${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.status = response.status
            this.responseJson = response.json();

            return this.responseJson;
        })
            .then((data) => this.response = data)
            .catch((error) => console.log(error));
    }

    async post(url: string, body: any) {
        if (url.startsWith('/')) {
            url = url.substring(1);
        }

        return fetch(`${this.apiUrl}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            this.status = response.status
            this.responseJson = response.json();

            return this.responseJson;
        })
            .then((data: any) => {
                this.response = data;
                this.message = data.message;
                return this.response;
            })
            .catch((error) => console.log(error));
    }

    async put(url: string, body: any) {
        if (url.startsWith('/')) {
            url = url.substring(1);
        }

        return fetch(`${this.apiUrl}/${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            this.status = response.status
            this.responseJson = response.json();

            return this.responseJson;
        })
            .then((data) => this.response = data)
            .catch((error) => console.log(error));
    }

    async delete(url: string) {
        if (url.startsWith('/')) {
            url = url.substring(1);
        }

        return fetch(`${this.apiUrl}/${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.status = response.status
            this.responseJson = response.json();

            return this.responseJson;
        })
            .then((data: any) => {
                this.response = data
                this.message = data.message
                return this.response
            })
            .catch((error) => console.log(error));
    }
}