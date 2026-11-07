// Cuadros reales de examen. Las filas apuntan a la farmacoteca para no duplicar respuestas.
import type { CuadroReal } from './tipos';
import { ficha } from './index';
import { fuente } from './h';

/** Filas que los exámenes piden y no son un fármaco individual. */
export const FILAS_EXTRA: Record<string, { nombre: string; mecanismo: string; efecto: string }> = {
  'dopamina-alta': { nombre: 'Dopamina en dosis altas', mecanismo: 'Estimula receptores α1 adrenérgicos', efecto: 'Vasoconstricción' },
  'dopamina-baja': { nombre: 'Dopamina en dosis bajas', mecanismo: 'Actúa sobre receptores D1 y D2', efecto: 'Vasodilatación, aumenta la diuresis, hipotensión y bradicardia' },
  barbituricos: { nombre: 'Barbitúricos', mecanismo: 'Aumentan el tiempo de apertura de canales de cloro del GABA-A', efecto: 'Antiepilépticos' },
};

const c = (id: string, loc: string, titulo: string, filas: string[]): CuadroReal => ({ id, fuente: fuente(loc), titulo, filas });

export const CUADROS: CuadroReal[] = [
  c('c1', 'DES c1', 'Complete el cuadro: mecanismo y efecto', ['haloperidol', 'selegilina', 'fluoxetina', 'salbutamol', 'valproico']),
  c('c4', 'DES c4', 'Complete el cuadro', ['cetirizina', 'domperidona', 'fenitoina', 'loratadina', 'hioscina']),
  c('c12', 'DES c12', 'Complete el cuadro', ['bromocriptina', 'haloperidol', 'selegilina']),
  c('c17', 'DES c17', 'Complete el cuadro', ['valproico', 'diazepam', 'propranolol', 'hioscina', 'succinilcolina', 'metoclopramida', 'prazosin', 'carvedilol', 'etoposido', 'metotrexato', 'rituximab', 'infliximab', 'fenitoina', 'difenhidramina', 'famotidina', 'eritropoyetina', 'flumazenil']),
  c('c18', 'DES c18', 'Complete el cuadro', ['amitriptilina', 'prazosin', 'dopamina-alta', 'atropina', 'barbituricos', 'clorgilina', 'moclobemida', 'vincristina', 'sertralina', 'fluoxetina', 'metoclopramida', 'loratadina', 'doxorrubicina', 'haloperidol', 'propinoxato', 'succinilcolina', 'fenobarbital', 'valproico', 'salbutamol', 'ciclofosfamida', 'carvedilol', 'fenitoina', 'famotidina', 'eritropoyetina']),
  c('c21', 'DES c21', 'Complete el cuadro', ['bromocriptina', 'risperidona', 'fluoxetina']),
  c('c25', 'DES c25', 'Complete el gráfico', ['atropina', 'levodopa', 'salbutamol', 'clorgilina', 'valproico', 'risperidona', 'difenhidramina', 'selegilina', 'prazosin', 'ciclofosfamida']),
  c('c26', 'DES c26', 'Complete los siguientes cuadros', ['succinilcolina', 'bromocriptina', 'ipratropio', 'fluoxetina', 'amantadina', 'metoclopramida', 'risperidona', 'salbutamol', 'prazosin', 'ciclofosfamida']),
  c('c27', 'DES c27', 'Complete el cuadro', ['propinoxato', 'succinilcolina', 'fenobarbital', 'valproico', 'cisaprida', 'domperidona', 'metotrexato', 'salbutamol', 'dopamina-alta']),
  c('c28', 'DES c28', 'Complete el cuadro', ['hioscina', 'prazosin', 'atenolol', 'bromocriptina', 'labetalol', 'risperidona', 'metoclopramida', 'sertralina', 'famotidina', 'vincristina']),
  c('c29', 'DES c29', 'Complete el cuadro', ['barbituricos', 'clorgilina', 'difenhidramina', 'fluoxetina', 'dopamina-alta', 'atropina', 'propranolol']),
  c('c30', 'DES c30', 'Complete el cuadro', ['cisaprida', 'haloperidol', 'metotrexato', 'salbutamol', 'dopamina-baja', 'carvedilol', 'metoclopramida', 'loratadina', 'doxorrubicina', 'fenitoina', 'amitriptilina', 'clonidina', 'clonazepam']),
  c('e23', 'EXA 23', 'Complete el cuadro', ['bromocriptina', 'haloperidol', 'selegilina']),
  c('e34', 'EXA 34', 'Complete el cuadro', ['selegilina', 'fluoxetina', 'metoclopramida']),
];

export function filaCuadro(id: string) {
  const e = FILAS_EXTRA[id];
  if (e) return e;
  const f = ficha(id);
  if (!f) throw new Error(`Fila de cuadro sin ficha: ${id}`);
  return { nombre: f.nombre, mecanismo: f.mecanismo, efecto: f.efecto };
}
