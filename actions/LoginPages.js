export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async acessPage() {
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async informCpf(cpf) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informPassword(password) {
        for (const digito of password) {
            await this.page.getByRole('button', { name: digito }).click();
        }
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async inform2FA(code) {
        await this.page.getByRole('textbox', { name: '000000' }).fill(code);
        await this.page.getByRole('button', { name: 'Verificar' }).click();

    }
}