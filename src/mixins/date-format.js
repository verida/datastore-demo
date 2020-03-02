export default {
    methods: {
        format (str) {
            switch (str) {
                case 'date-time':
                    return 'DD MMMM YYYY HH:mm'
                case 'date':
                    return 'DD MMMM YYYY'
                default:
                    return ''
            }
        }
    }
}
