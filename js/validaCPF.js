class ValidaCPF {
    constructor(cpfValor) {
        Object.defineProperties(this, {
            cpf: {
                enumerable: true,
                configurable: false,
                get: function () {
                    return cpfValor;
                },
                set: function (cpf) {
                    cpfValor = cpf;
                }
            },
            validade: {
                configurable: false,
                get: function () {
                    return this.validarCPF(cpfValor);
                }
            }
        });
    }
    
    gerarCPFValido() {
        let arr = Array.from({ length: 9 }, () => Math.floor(Math.random() * 9));
        let newCPF = this.getDigitos(arr, 10);
        this.cpf = newCPF.substring(0, 3) + '.' + newCPF.substring(3, 6) + '.' + newCPF.substring(6, 9) + '-' + newCPF.substring(9, 11);
    }

    validarCPF(cpf) {
        let cpfString = cpf.replace(/\D+/g, '');
        let cpfArray = Array.from(cpfString);
        cpfArray.splice(cpfArray.length - 2, Number.MAX_VALUE);
        let cpfFormatado = this.getDigitos(cpfArray, 10);
        if (cpfString == cpfFormatado)
            return true;
        return false;
    }

    getDigitos(cpf, acumuladorParametro) {
        let conta = 0;
        let total = cpf.reduce(function (acumulador, valor) {
            conta += (acumulador * valor);
            acumulador--;
            if (acumulador > 1)
                return acumulador;
            return conta;
        }, acumuladorParametro);
        let digito = 11 - (total % 11);
        digito = (digito > 9) ? '0' : digito.toString();
        cpf.push(digito);
        if (cpf.length < 11)
            this.getDigitos(cpf, 11);
        return this.formataCPF(cpf);
    }

    formataCPF(cpf) {
        let cpfLimpo = cpf.join('');
        return cpfLimpo;
    }
}



