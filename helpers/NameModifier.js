export default function extract (data, collection) {
    switch (collection) {
        case 'shopping/receipt':
            return data.name
        case 'identity/kyc/AU':
            const { firstName, middleName, lastName } = data
            return `${firstName} ${middleName} ${lastName}`
    }
}