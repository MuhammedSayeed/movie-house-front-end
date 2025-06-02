const useLocalStorage = () => {

    const setOnLocalStorage = (key: string, value: string) => {
        localStorage.setItem(key, value);
    };

    const removeFromLocalStorage = (key: string) => {
        localStorage.removeItem(key);
    };

    const getFromLocalStorage = (key: string) => {
        return localStorage.getItem(key);
    }

    return {
        setOnLocalStorage,
        removeFromLocalStorage,
        getFromLocalStorage
    }

}

export default useLocalStorage;