export default {
    data() {
        return {
            user: {
                username: "",
                name: "",
                email: "",
                edad: 0,
                password: "",
                rol: 1,
            },
            validEdad: "",
            validMail: "",
            validNombre: "",
            validPassword: "",
            validUsername: "",
        }
    },
    methods: {
        resetForm() {
            this.user.username = "";
            this.user.name = "";
            this.user.email = "";
            this.user.edad = 0;
            this.user.password = "";
        },
        checkNewUserForm() {
            return (this.validateUsername() && this.validateNombreSubmit() && this.validateEmail() && this.validateEdad() && this.validatePassword())
            },
        validateUsername(){
            let reg_ex_username = /^\S[a-zA-Z]{3,}/;
            if (reg_ex_username.test(this.user.username)){
                this.validUsername = "";
                return true;
            } else {
                this.validUsername = "Su nombre de usuario debe tener al menos 4 letras y no puede contener espacios";
                return false;
            }
        },
        validateNombre(event){
            if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106)) {
                this.user.name = this.user.name.substring(0,this.user.name.length-1);
                return false;
            }
            let reg_ex_nombre = /[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*/;
            if (reg_ex_nombre.test(this.user.name)){
                this.validNombre = "";
                return true;
            } else {
                this.validNombre = "Formato de nombre inválido";
                return false;
            }
        },
        validateNombreSubmit(){
            let reg_ex_nombre = /[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*/;
            if (reg_ex_nombre.test(this.user.name)){
                this.validNombre = "";
                return true;
            } else {
                this.validNombre = "Formato de nombre inválido";
                return false;
            }
        },
        validateEmail(){
            let reg_ex_mail = /^[^@]+@[^@]+.[a-zA-Z]{2,}$/;
            if (reg_ex_mail.test(this.user.email)){
                this.validMail = "";
                return true;
            } else {
                this.validMail = "Mail inválido";
                return false;
            }
        },
        validateEdad(){
            if (this.user.edad >= 18 && this.user.edad <= 100){
                this.validEdad = "";
                return true;
            } else if (this.user.edad < 0) {
                this.user.edad = 0;
            } else if (this.user.edad > 100) {
                this.user.edad = 100;
            }
            this.validEdad = "Debe ingresar una edad entre 18 y 100 años.";
            return false;
            },
        validatePassword(){
            let reg_ex_password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if (reg_ex_password.test(this.user.password)){
                this.validPassword = "";
                return true;
            } else {
                this.validPassword = "La contraseña debe contener al menos 8 caracteres, una mayúscula, un caracter especial y un número."
                return false;
            }
        }
    },
}
