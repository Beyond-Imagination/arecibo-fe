import { ITheme } from '@/types'

export default function getTheme(): Promise<ITheme> {
    return new Promise(resolve => {
        const channel = new MessageChannel()
        channel.port1.onmessage = e => resolve(e.data)
        window.parent.postMessage(
            {
                type: 'GetThemePropertiesRequest',
                subscribeForUpdates: false,
            },
            '*',
            [channel.port2],
        )
    })
}
