import SecureLS from 'secure-ls';

const ls: SecureLS = new SecureLS({
    encodingType: 'aes',
    isCompression: true,
    encryptionSecret: process.env.NEXT_PUBLIC_SECRET_KEY,
});

function setLsItem(key: string, data: any) {
    ls.set(key, data);
}

function getLsItem(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
        return localStorage.getItem(key);
    }
    return null;
}

function removeLsItem(key: string) {
    ls.remove(key);
}

function removeAllLsItems() {
    ls.removeAll();
}

function clearLsItems() {
    ls.clear();
}

export { setLsItem, getLsItem, clearLsItems, removeLsItem, removeAllLsItems, ls };