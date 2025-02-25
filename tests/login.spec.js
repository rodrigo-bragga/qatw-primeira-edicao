import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { LoginPage } from '../actions/LoginPages';
import { DashPage } from '../actions/DashPAage';
import exp from 'constants';
import { cleanJobs, getJob } from '../support/redis';

test('Nao deve logar quando o codigo de autenticacao e invalido', async ({ page }) => {

  const loginPage = new LoginPage(page)

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  await loginPage.acessPage()
  await loginPage.informCpf(usuario.cpf)
  await loginPage.informPassword(usuario.senha)

  // temporario
  await page.getByRole('heading', { name: 'Verificação em duas etapas' })
  .waitFor({ timeout: 3000 })  
  await loginPage.inform2FA('123456')
  
  // temporario

  expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('Deve acessar conta do usuario', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const dashPage = new DashPage(page)

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  await cleanJobs()

  await loginPage.acessPage()
  await loginPage.informCpf(usuario.cpf)
  await loginPage.informPassword(usuario.senha)

  // ceckpoint
  await page.getByRole('heading', { name: 'Verificação em duas etapas' })
  .waitFor({ timeout: 3000 })

  const code = await getJob()
  // const code = await obterCodigo2FA(usuario.cpf)

  await loginPage.inform2FA(codedddd)

  await expect(await dashPage.getBalance()).toHaveText('R$ 5.000,00')
});