import { $Fetch, $fetch } from "ofetch";
import { useAuthStore } from "~/store/auth/auth";
import { useCustomCookies } from "~/composables/shared/useCustomCookies";

class HttpRequest {

    private readonly apiFetch: $Fetch;

    private fetchOptions = {
        baseURL: useRuntimeConfig().public.apiBase,
        body: null,
        headers: {
            'Content-Type':<string> 'application/json',
            Accept: 'application/json',
            Credentials: true,
            'X-Forwarded-For': useRuntimeConfig().public.appUrl,
            'Access-Control-Allow-Origin': '*'
        },
        method:<string> 'GET'
    }


    constructor(crateApiFetch: any) {
        this.apiFetch = crateApiFetch
    }

    async get(url: string) {
        this.setOptions('GET');
        // @ts-ignore
        return this.apiFetch(url, this.fetchOptions);
    }

    async post(url: string, data: object) {
        this.setOptions('POST', data);
        // @ts-ignore
        return this.apiFetch(url, this.fetchOptions);
    }

    async upload(url: string, image: string, source: string) {
        let options = {...this.fetchOptions};
        // @ts-ignore
        delete options.headers["Accept"];
        // @ts-ignore
        delete options.headers["Content-Type"];
        options.baseURL = useRuntimeConfig().public.imageApiUrl;
        options.method = 'POST';

        let form = new FormData;
        form.append('image', image);
        form.append('source', source);
        // @ts-ignore
        options.body = form;
        // @ts-ignore
        return this.apiFetch(url, options);
    }

    private setOptions(method: string, body?: object): void {
        this.fetchOptions.method = method;
        method === 'GET' && (this.fetchOptions.body = null)
        // @ts-ignore
        method !== 'GET' && body && (this.fetchOptions.body = body);

    }

}
const crateApiFetch = $fetch.create({
    //async onResponseError({ request, response, options }) {},

    //async onResponse({request, options, response}) {},

    async onRequest({ request, options }) {
        const token = useCustomCookies().getAuthToken();
        // @ts-ignore
        token && (options.headers.Authorization = <string> `Bearer ${token}`);
    }
})


export default defineNuxtPlugin(async (NuxtApp) => {
    // @ts-ignore
    const httpPlugin: Plugin = ({ $httpRequest }) => {
        new HttpRequest(crateApiFetch)
    }
    NuxtApp.provide('httpRequest', new HttpRequest(crateApiFetch));
});