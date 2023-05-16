export default defineAppConfig({
    authCookie: {
        key: 'access_token',
        options: {
            maxAge: 31536000,
            domain: 'localhost'
        }
    }
})