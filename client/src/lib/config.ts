export type NodeEnv = "development" | "production"

export interface IEnv {
    NODE_ENV: NodeEnv
    VERSION:  string
}

// Provided using `webpack.DefinePlugin`
// @ts-ignore: next-line
const env: IEnv = ENV

export interface IConfig {
    env: NodeEnv
    version: string
    apiUrl: string
}

class Configuration implements IConfig {

    public env: NodeEnv
    public version: string
    public apiUrl: string

    constructor() {
        this.env     = env.NODE_ENV
        this.version = env.VERSION
        this.apiUrl = process.env["API_URL"]
    }

    /** Returns `true` if the application is not running in a production environment. */
    public notProduction(): boolean {
        return this.env != "production"
    }

    public toJSON() {
        return {
            env:     this.env,
            version: this.version,
            apiUrl:  this.apiUrl,
        }
    }
}

const _CONFIG = new Configuration()

export const CONFIG = _CONFIG
