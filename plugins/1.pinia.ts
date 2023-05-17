import { PiniaPluginContext } from 'pinia'
// @ts-ignore
import { Plugin } from '@nuxt/types'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
    store.$subscribe((mutation) => {})
    return { creationTime: new Date() }
}

export default defineNuxtPlugin(async (NuxtApp) => {

    // @ts-ignore
    const piniaPlugin: Plugin = ({ $pinia }) => {
        $pinia.use(MyPiniaPlugin)
    }
});