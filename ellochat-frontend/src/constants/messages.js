export default class Messages {
    static getBrazilianPortgueseMessageRegister(message) {
        switch (message) {
            case "auth/invalid-email":
                return "E-mail inválido!";
            case "auth/weak-password":
                return "Senha fraca. A senha deve conter 6 caracteres ou mais!";
            case "auth/email-already-in-use":
                return "E-mail já cadastrado!";
            default:
                return "Erro ao realizar o cadastro do usuário!";
        }
    }
}