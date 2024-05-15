import { ITheme } from '@/types'

export default function setTheme() {
    const channel = new MessageChannel()
    channel.port1.onmessage = e => {
        const themeData = e.data as ITheme

        if (themeData.isDark) {
            document.documentElement.setAttribute('data-theme', 'dark')
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
            document.documentElement.classList.remove('dark')
        }
    }
    window.parent.postMessage(
        {
            type: 'GetThemePropertiesRequest',
            subscribeForUpdates: true,
        },
        '*',
        [channel.port2],
    )
}
