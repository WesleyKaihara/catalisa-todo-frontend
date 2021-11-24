import JwtDecode from 'jwt-decode';

const LocalStorageHelper = {
    setToken(token) {
        window.localStorage.setItem('USER_TOKEN', token);  //banco de dados chave/valor
    },
    getToken() {
        return window.localStorage.getItem('USER_TOKEN');
    },
    removeToken() {   //botao de sair
        window.localStorage.removeItem('USER_TOKEN');
    },
    isAuthenticated() {
        try {
            const token = LocalStorageHelper.getToken();

            if (!token) return false;
            const payload = JwtDecode(token);

            const expirationDate = new Date(payload.exp * 1000);
            const currentDate = new Date();

            return expirationDate > currentDate;
        } catch (error) {
            console.warn(error);
            return false;
        }
    },
};

export default LocalStorageHelper;
