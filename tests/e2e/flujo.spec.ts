// Recorre lo que hace Flor en el celular y comprueba que el progreso sobrevive.
import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

test('choice: corrige, explica y guarda', async ({ page }) => {
  await page.goto('/farmaco-flor/#/c/col/choice');
  await expect(page.getByText('Pregunta real').first()).toBeVisible();
  await page.locator('.opcion').first().click();
  await expect(page.locator('.opcion.bien').first()).toBeVisible();
  await page.getByRole('button', { name: 'Seguir' }).click();
  const guardado = await page.evaluate(() => JSON.parse(localStorage.getItem('farmaco-flor') ?? '{}'));
  expect(Object.keys(guardado.preguntas).length).toBeGreaterThan(0);
});

test('reconocer con opciones no consolida un nombre', async ({ page }) => {
  await page.goto('/farmaco-flor/#/memorizar');
  await page.getByRole('button', { name: 'Colinérgicos' }).click();
  for (let i = 0; i < 6; i++) {
    const op = page.locator('.opcion:not([disabled])').first();
    if (await op.count() === 0) break;
    await op.click();
    const seguir = page.getByRole('button', { name: /Seguir|Entendido/ });
    if (await seguir.count()) await seguir.click();
  }
  const e = await page.evaluate(() => JSON.parse(localStorage.getItem('farmaco-flor') ?? '{}'));
  const niveles = Object.values(e.memoria as Record<string, { nivel: string }>).map(m => m.nivel);
  expect(niveles).not.toContain('consolidado');
  expect(niveles).not.toContain('recordado');
});

test('lista en blanco: acepta errores de tipeo y registra recuerdo sin pistas', async ({ page }) => {
  await page.goto('/farmaco-flor/#/memorizar');
  await page.getByText('Colinérgicos', { exact: true }).nth(1).click();
  await page.getByRole('button', { name: 'Bloqueantes neuromusculares' }).click();
  for (let i = 0; i < 12; i++) {
    if (await page.locator('.campo').count()) break;
    const op = page.locator('.opcion:not([disabled])').first();
    if (await op.count()) { await op.click(); }
    const seguir = page.getByRole('button', { name: /Seguir|Entendido|Ya lo pensé|Lo sabía/ }).first();
    if (await seguir.count()) await seguir.click();
  }
  await expect(page.locator('.campo')).toBeVisible();
  await page.locator('.campo').fill('atracuro');
  await expect(page.locator('.chip.lleno', { hasText: 'Atracurio' })).toBeVisible();
  const e = await page.evaluate(() => JSON.parse(localStorage.getItem('farmaco-flor') ?? '{}'));
  expect(e.memoria.atracurio.recuerda).toBe(1);
  expect(e.memoria.atracurio.nivel).toBe('recordado');
});

test('el progreso sobrevive a recargar y se puede exportar', async ({ page }) => {
  await page.goto('/farmaco-flor/#/');
  await page.evaluate(() => localStorage.setItem('farmaco-flor', JSON.stringify({ v: 1, memoria: { atropina: { nivel: 'consolidado', reconoce: 3, recuerda: 2, errores: 0, dias: ['2026-11-01', '2026-11-02'], intervalo: 3, proximo: 9e15, ultimo: 1, confusiones: {}, erroresAccion: 0 } } })));
  await page.reload();
  await expect(page.getByText('1 de ').first()).toBeVisible();
  await page.goto('/farmaco-flor/#/ajustes');
  await expect(page.getByRole('button', { name: 'Exportar' })).toBeVisible();
  const [descarga] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar' }).click()]);
  expect(descarga.suggestedFilename()).toContain('farmaco-progreso');
});

test('mapa oculto tapa y revela', async ({ page }) => {
  await page.goto('/farmaco-flor/#/c/dop/mapa');
  await page.getByRole('button', { name: 'Mapa oculto' }).click();
  const n = page.locator('.nombre.tapado').first();
  await expect(n).toBeVisible();
  const antes = await page.locator('.nombre.tapado').count();
  await n.click();
  expect(await page.locator('.nombre.tapado').count()).toBe(antes - 1);
});

test('el buscador encuentra por receptor y por grafía del material', async ({ page }) => {
  await page.goto('/farmaco-flor/#/farmacoteca');
  await page.getByLabel('Buscar').fill('carbegolina');
  await expect(page.locator('.resultado b', { hasText: 'Cabergolina' })).toBeVisible();
  await page.getByLabel('Buscar').fill('5-HT3');
  await expect(page.locator('.resultado b', { hasText: 'Ondansetrón' })).toBeVisible();
});

test('recorrer la teoría y llegar al video', async ({ page }) => {
  await page.goto('/farmaco-flor/#/c/gab/teoria');
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await expect(page.locator('.narracion')).not.toBeEmpty();
  await expect(page.locator('.lienzo svg')).toBeVisible();
});
