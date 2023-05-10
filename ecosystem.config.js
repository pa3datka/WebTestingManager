module.exports = {
    apps: [
        {
            name: 'testing-manager',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            env: {
                PORT: 3000,
                NODE_ENV: "production"
	        }
        }
    ]
}
