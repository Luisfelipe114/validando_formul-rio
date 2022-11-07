class Erro {
    constructor(campo, erro) {
        this.campo = campo;
        this.erro = erro;
    }
}

class Formulario{
    constructor() {
        this.formulario = document.forms["form"];
        this.formElements = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => this.controlarSubmit(e));

    }

    controlarSubmit(e) {
        e.preventDefault();
        this.erros = Array();
        for(let i = 0; i < this.formulario.length - 1; i++) {
            if(this.formulario[i].value == '') {
                let campoVazioErro = new Erro(this.formulario[i] , "campo precisa estar preenchido")
                this.erros.push(campoVazioErro);
            };
        }

        const camposValidos = this.validarCampos();
        const senhasValidas = this.validarSenha();

        
        if(camposValidos && senhasValidas) {
            alert('Formulário enviado.');
            this.formulario.submit();
        } else {
            this.mostrarErros();
        }
    }

    validarCampos() {
        const cpfValido = this.validarCPF();
        const usuarioValido = this.validarUsuario();
        if(cpfValido && usuarioValido) return true;
        return false;
    }

    validarCPF() {
        const cpf = new ValidaCPF(this.formulario["cpf"].value);
        if(!(cpf.validade)) {
            let cpfErro = new Erro(this.formulario["cpf"] , "cpf inválido");
            this.erros.push(cpfErro);
            console.log(cpfErro.campo, cpfErro.erro);
        }
        return cpf.validade;
    }

    validarUsuario() {
        const nomeUsuario = this.formulario["usuario"].value;
        let validUsuario = true;
        if(nomeUsuario.length < 3 || nomeUsuario.length > 12) {
            let tamNomeUsuarioErro = new Erro(this.formulario["usuario"], "usuário deve conter de 3 a 12 caracteres");
            this.erros.push(tamNomeUsuarioErro);
            validUsuario = false;
        }

        if(!nomeUsuario.match(/^[a-zA-Z0-9]+$/g)) {
            let caractNomeUsuarioErro = new Erro(this.formulario["usuario"], "Nome de usuário precisar conter apenas letras e/ou números");
            this.erros.push(caractNomeUsuarioErro);
            validUsuario = false;
        }
        return validUsuario;
    }

    validarSenha() {
        const senha = this.formulario["senha"].value;
        const confirmaSenha = this.formulario["confirma_senha"].value;
        let validSenha = true;
        if(senha !== confirmaSenha) {
            let senhasDiferemErro = new Erro(this.formulario["senha"], "Campos senha e repetir senha precisar ser iguais");
            let senhasDiferemErro2 = new Erro(this.formulario["confirma_senha"] ,"Campos senha e repetir senha precisar ser iguais");
            this.erros.push(senhasDiferemErro);
            this.erros.push(senhasDiferemErro2);
            validSenha = false;
        }
        if(senha.length < 6 || senha.length > 12) {
            let tamSenhaErro = new Erro(this.formulario["senha"],"Senha precisa estar entre 6 e 12 caracteres");
            this.erros.push(tamSenhaErro);
            validSenha = false;
        }
        return validSenha;
    }

    mostrarErros() {
        if(this.erros.length == 0) return;
        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }
        for(let i in this.erros) {
            const div = document.createElement('div');
            const campo = this.erros[i].campo;
            div.id = this.erros[i].erro;
            div.innerText = this.erros[i].erro;
            div.classList.add('error-text');
            campo.insertAdjacentElement('afterend', div);
        }
    }
}

const f1 = new Formulario();


