import secureLocalStorage from "react-secure-storage";
export const SecureService = {
  encryptsetItem,
  encryptgetItem,
  storageRemove,
  storageAllClear,
};

function encryptsetItem(storageName: string, data:any) {
  secureLocalStorage.setItem(storageName, data);
}

function encryptgetItem(storageName: string) {
  return secureLocalStorage.getItem(storageName);
}

function storageRemove(storageName: string) {
  secureLocalStorage.removeItem(storageName);
}

function storageAllClear() {
  secureLocalStorage.clear();
}
