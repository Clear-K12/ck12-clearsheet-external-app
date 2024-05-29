const CryptoJS = require("crypto-js");
export const Security = {
    encryption, decryption
};

function encryption(data: string) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
}
function decryption(encryptedString: string) {
    return CryptoJS.enc.Base64.parse(encryptedString).toString(CryptoJS.enc.Utf8);
}
