'use client';

import Link from 'next/link';
import { ArrowLeft, Calculator, CheckCircle, Info } from 'lucide-react';

const MORTGAGES = [
  {
    name: '7-20-25',
    bank: 'Государственная программа',
    rate: '7%',
    down: '20%',
    term: '25 лет',
    maxAmount: '15 млн ₸',
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    tag: 'Государственная',
    conditions: [
      'Только для граждан РК',
      'Первое жильё (не имели жилья 5 лет)',
      'Только первичный рынок (новостройки)',
      'Доход не ограничен',
      'Возраст 18–65 лет',
    ],
    description: 'Государственная программа льготного ипотечного кредитования. Ставка 7% фиксированная на весь срок. Подходит для тех, кто покупает жильё впервые.',
  },
  {
    name: 'Баспана Хит',
    bank: 'Отбасы банк',
    rate: 'от 5%',
    down: 'от 10%',
    term: 'до 20 лет',
    maxAmount: '35 млн ₸',
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700',
    tag: 'Популярная',
    conditions: [
      'Граждане РК',
      'Первичный и вторичный рынок',
      'Накопления в Отбасы банке от 3 лет',
      'Ставка зависит от срока накоплений',
      'Возраст 18–65 лет',
    ],
    description: 'Ипотека через накопительный вклад в Отбасы банке. Чем дольше копишь — тем ниже ставка. Самая низкая ставка на рынке при наличии накоплений.',
  },
  {
    name: 'Жас Отбасы',
    bank: 'Отбасы банк',
    rate: 'от 5%',
    down: 'от 10%',
    term: 'до 25 лет',
    maxAmount: '15 млн ₸',
    color: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    tag: 'Для молодых семей',
    conditions: [
      'Молодые семьи до 35 лет',
      'Состоят в браке',
      'Первое жильё',
      'Первичный рынок',
      'Доход обоих супругов учитывается',
    ],
    description: 'Программа для молодых семей. Льготная ставка для супругов до 35 лет. Государство субсидирует часть ставки.',
  },
  {
    name: 'Нурлы Жер',
    bank: 'Отбасы банк / БВУ',
    rate: 'от 5% (субс.)',
    down: 'от 20%',
    term: 'до 20 лет',
    maxAmount: '20 млн ₸',
    color: 'bg-yellow-50 border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    tag: 'Субсидированная',
    conditions: [
      'Граждане РК',
      'Первичный рынок (аккредитованные ЖК)',
      'Очередники акиматов',
      'Работники бюджетной сферы',
      'Участники ЖССБК',
    ],
    description: 'Государственная программа субсидирования ипотеки. Государство выплачивает часть процентов. Требует постановки в очередь через акимат.',
  },
  {
    name: 'Коммерческая ипотека',
    bank: 'Халык Банк / БЦК / Каспи',
    rate: 'от 15.5%',
    down: 'от 20%',
    term: 'до 20 лет',
    maxAmount: 'без ограничений',
    color: 'bg-slate-50 border-slate-200',
    badge: 'bg-slate-100 text-slate-700',
    tag: 'Без очереди',
    conditions: [
      'Любой гражданин РК',
      'Первичный и вторичный рынок',
      'Официальный доход',
      'Без ограничений по жилью',
      'Быстрое одобрение',
    ],
    description: 'Стандартная ипотека от коммерческих банков. Без государственных программ, без очередей. Ставка рыночная. Быстрое рассмотрение заявки.',
  },
  {
    name: 'Ипотека для IT-специалистов',
    bank: 'Отбасы банк / Халык',
    rate: 'от 5%',
    down: 'от 10%',
    term: 'до 25 лет',
    maxAmount: '30 млн ₸',
    color: 'bg-indigo-50 border-indigo-200',
    badge: 'bg-indigo-100 text-indigo-700',
    tag: 'Для IT',
    conditions: [
      'Работники аккредитованных IT-компаний',
      'Официальное трудоустройство',
      'Первичный и вторичный рынок',
      'Подтверждение занятости в IT',
    ],
    description: 'Специальные условия для сотрудников IT-компаний, аккредитованных в МЦРИАП. Льготная ставка как альтернатива государственным программам.',
  },
];

const BANKS = [
  { name: 'Отбасы банк', rate: 'от 5%', site: 'hcsbk.kz' },
  { name: 'Халык банк', rate: 'от 15.5%', site: 'halykbank.kz' },
  { name: 'БЦК', rate: 'от 16%', site: 'bcc.kz' },
  { name: 'Каспи банк', rate: 'от 17%', site: 'kaspi.kz' },
  { name: 'Bereke Bank', rate: 'от 15.9%', site: 'berekebank.kz' },
  { name: 'Freedom Bank', rate: 'от 16.5%', site: 'ffin.kz' },
];

export default function MortgagePage() {
  return (
    <div className="bg-[#F5F6F8] min-h-screen py-8">
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary text-sm transition">
            <ArrowLeft className="h-4 w-4 mr-1" /> На главную
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Ипотека в Казахстане 2026</h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Актуальные программы ипотечного кредитования — государственные и коммерческие
          </p>
        </div>

        {/* Quick tip */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            <b>Совет:</b> Для получения государственной ипотеки (7-20-25, Нурлы Жер) нужно встать в очередь через акимат или egov.kz. Отбасы банк позволяет накапливать и получить ипотеку под 5% без очереди.
          </p>
        </div>

        {/* Programs */}
        <div className="space-y-4 mb-10">
          {MORTGAGES.map((m) => (
            <div key={m.name} className={`border rounded-xl overflow-hidden ${m.color}`}>
              <div className="p-5">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-extrabold">{m.name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${m.badge}`}>{m.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{m.bank}</p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <div className="text-xl font-extrabold text-primary">{m.rate}</div>
                      <div className="text-[11px] text-muted-foreground">ставка</div>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold">{m.down}</div>
                      <div className="text-[11px] text-muted-foreground">взнос</div>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold">{m.term}</div>
                      <div className="text-[11px] text-muted-foreground">срок</div>
                    </div>
                    <div>
                      <div className="text-base font-bold">{m.maxAmount}</div>
                      <div className="text-[11px] text-muted-foreground">макс. сумма</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{m.description}</p>

                <div className="flex flex-wrap gap-2">
                  {m.conditions.map((c) => (
                    <span key={c} className="flex items-center gap-1 text-xs bg-white/70 px-2 py-1 rounded-full border border-white">
                      <CheckCircle className="h-3 w-3 text-green-500" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Банки */}
        <div className="bg-white border border-border rounded-xl p-5 mb-6">
          <h2 className="font-bold text-base mb-4">Банки-партнёры и ставки</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {BANKS.map((b) => (
              <div key={b.name} className="bg-[#F5F6F8] rounded-lg p-3 flex items-center justify-between">
                <span className="text-sm font-medium">{b.name}</span>
                <span className="text-sm font-bold text-primary">{b.rate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Калькулятор CTA */}
        <div className="bg-gradient-to-r from-primary to-red-400 rounded-xl p-6 text-white text-center">
          <Calculator className="h-8 w-8 mx-auto mb-2" />
          <h3 className="font-bold text-lg mb-1">Рассчитайте ежемесячный платёж</h3>
          <p className="text-white/80 text-sm mb-4">Используйте наш калькулятор чтобы подобрать оптимальные условия</p>
          <Link href="/calculator"
            className="inline-block px-6 py-2.5 bg-white text-primary font-bold rounded-full hover:shadow-lg transition">
            Открыть калькулятор
          </Link>
        </div>
      </div>
    </div>
  );
}
