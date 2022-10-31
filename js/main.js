class Erro {
    constructor(campo, erro) {
        this.campo = campo;
        this.erro = erro;
    }
}

class Formulario{
    constructor() {
        this.formulario = document.forms["form"];
        //this.formulario = document.querySelector('.formulario')
        this.eventos();
        this.erros = Array();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => this.controlarSubmit(e));
    }

    controlarSubmit(e) {
        e.preventDefault();
        let campoVazio = false;
        for(let i = 0; i < f1.formulario.length - 1; i++) {
            if(f1.formulario[i] == '') {
                campoVazio = true;
                let campoVazioErro = new Erro(this.formulario[i], "campo precisa estar preenchido")
                this.erros.push(campoVazioErro);
            };
        }
        if(!(campoVazio)) return;
        const camposValidos = this.validarCampos();
        const senhasValidas = this.validarSenha();

        
        if(camposValidos && senhasValidas) {
            alert('Formulário enviado.');
            this.formulario.submit();
        }
    }

    validarCampos() {
        const cpfValido = this.validarCPF();
        const usuarioValido = this.validarUsuario();
    }

    validarCPF() {
        const cpf = new ValidaCPF(this.formulario["cpf"].value);
        if(!(cpf.validade)) {
            let cpfErro = new Erro(this.formulario["cpf"], "cpf inválido");
            this.erros.push(cpfErro);
            console.log(cpfErro.campo, cpfErro.erro);
        }
        return cpf.validade;
    }

    validarUsuario() {
        const nomeUsuario = this.formulario["usuario"].value;
        if(nomeUsuario.length < 3 || nomeUsuario.length > 12) {
            let tamNomeUsuarioErro = new Erro(this.formulario["usuario"], "usuário deve conter de 3 a 12 caracteres");
            this.erros.push(tamNomeUsuarioErro);
            return false;
        }

        if(!nomeUsuario.match(/^[a-zA-Z0-9]+$/g)) {
            let caractNomeUsuarioErro = new Erro(this.formulario["usuario"], "Nome de usuário precisar conter apenas letras e/ou números");
            this.erros.push(caractNomeUsuarioErro);
            return false;
        }
        return true;
    }

    validarSenha() {
        const senha = this.formulario["senha"].value;
        const confirmaSenha = this.formulario["confirma_senha"].value;
        if(senha !== confirmaSenha) {
            let senhasDiferemErro = new Erro(this.formulario["senha"], "Campos senha e repetir senha precisar ser iguais");
            let senhasDiferemErro2 = new Erro(this.formulario["confirma_senha"], "Campos senha e repetir senha precisar ser iguais");
            this.erros.push(senhasDiferemErro);
            this.erros.push(senhasDiferemErro2);
            return false;
        }
        if(senha.length < 6 || senha.length > 12) {
            let tamSenhaErro = new Erro(this.formulario["senha"], "Senha precisa estar entre 6 e 12 caracteres");
            this.erros.push(tamSenhaErro);
            return false;
        }
        return true;
    }
}

const f1 = new Formulario();


