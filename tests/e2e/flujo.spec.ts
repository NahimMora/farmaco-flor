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
    if (await op.count()) await op.click();
    const seguir = page.getByRole('button', { name: /Seguir|Entendido/ });
    if (await seguir.count()) await seguir.click();
  }
  const e = await page.evaluate(() => JSON.parse(localStorage.getItem('farmaco-flor') ?? '{}'));
  const niveles = Object.values((e.memoria ?? {}) as Record<string, { nivel: string }>).map(m => m.nivel);
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

test('la guía abre desde el inicio y baja hasta cada fármaco', async ({ page }) => {
  await page.goto('/farmaco-flor/#/');
  await page.getByRole('link', { name: 'Ver el mapa de la 2ª ERA' }).click();
  await expect(page.getByRole('heading', { name: 'El mapa de la 2ª ERA' })).toBeVisible();
  await page.getByRole('button', { name: /Antagonistas D2/ }).click();
  await expect(page.locator('.hoja.abierta .chip', { hasText: 'Haloperidol' })).toBeVisible();
  await page.getByRole('button', { name: 'Serotoninérgicos' }).click();
  await expect(page.locator('.lugares .chip', { hasText: 'Fluoxetina' })).toBeVisible();
});

test('nada se sale de la pantalla en un celular chico', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  const rutas = ['/', '/guia', '/capitulos', '/integracion', '/examen/cuadros', '/examen/casos', '/farmacoteca', ...['toman', 'cuadro', 'mapa', 'lista', 'errores', 'minimo', 'era1', 'calidad'].map(v => `/esencial/${v}`), ...['col', 'adr', 'dop', 'ser', 'gab', 'his', 'neo', 'acm'].flatMap(c => ['mapa', 'nombres', 'cuadro', 'desarrollo'].map(p => `/c/${c}/${p}`))];
  const malas: string[] = [];
  for (const r of rutas) {
    await page.goto(`/farmaco-flor/#${r}`);
    await expect(page.locator('main').first()).toBeVisible();
    await page.waitForTimeout(250);
    const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o > 0) malas.push(`${r}: ${o}px`);
  }
  expect(malas).toEqual([]);
});

test('las parejas peligrosas entran con los nombres más largos', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/farmaco-flor/#/esencial/errores');
  await expect(page.locator('.pareja').first()).toBeVisible();
  const o = await page.evaluate(() => [...document.querySelectorAll('.lado')].filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth).length);
  expect(o).toBe(0);
});

test('los cuadros inversos dan el mecanismo y esconden el nombre', async ({ page }) => {
  await page.goto('/farmaco-flor/#/examen/cuadros');
  await expect(page.getByText('Antagonista R-5HT3 / Antiemético').first()).toBeVisible();
  const fila = page.locator('.tarjeta-fila', { hasText: 'Antagonista R-5HT3 / Antiemético' }).first();
  await fila.locator('.cinta.tapada').click();
  await expect(fila.getByText('Ondansetrón')).toBeVisible();
});

test('una marca corregida muestra la aclaración', async ({ page }) => {
  await page.goto('/farmaco-flor/#/c/dop/choice');
  for (let i = 0; i < 2; i++) { await page.locator('.opcion').first().click(); await page.getByRole('button', { name: 'Seguir' }).click(); }
  await expect(page.getByText('Meso-pontina')).toBeVisible();
  await page.locator('.opcion').first().click();
  await expect(page.getByText('La hoja marcaba mesocortical', { exact: false })).toBeVisible();
});
