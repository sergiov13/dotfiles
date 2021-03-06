console.log('Loaded!')
;(function () {
    const vscode = acquireVsCodeApi()
    const app = Vue.createApp({
        data: () => ({
            comment: '',
            sentiment: '',
            isSubmitting: false,
            error: '',
        }),
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('message', this.handleMessageReceived)
            })
        },
        methods: {
            handleMessageReceived: function (e) {
                const message = e.data
                switch (message.statusCode) {
                    case 'Failure':
                        console.error(`Failed to submit feedback: ${message.error}`)
                        this.error = message.error
                        this.isSubmitting = false
                        break
                }
            },
            submitFeedback: function () {
                this.error = ''
                this.isSubmitting = true
                console.log('Submitting feedback...')
                vscode.postMessage({
                    command: 'submitFeedback',
                    comment: this.comment,
                    sentiment: this.sentiment,
                })
            },
        },
    })
    app.mount('#app')
})()
