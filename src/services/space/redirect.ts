export function redirectRequest(url: string) {
    return new Promise(resolve => {
        const channel = new MessageChannel()
        channel.port1.onmessage = e => resolve(e.data)
        window.parent.postMessage(
            {
                type: 'RedirectWithConfirmationRequest',
                redirectUrl: url,
                newTab: true,
            },
            '*',
            [channel.port2],
        )
    })
}
