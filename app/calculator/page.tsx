'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-KZ').format(Math.round(value));

export default function CalculatorPage() {
  const [price, setPrice] = useState(30000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [rate, setRate] = useState(14);
  const [years, setYears] = useState(20);

  const result = useMemo(() => {
    const downPayment = (price * downPaymentPercent) / 100;
    const loan = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const monthly =
      monthlyRate === 0
        ? loan / n
        : (loan * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayment = monthly * n;
    const overpayment = totalPayment - loan;
    return { downPayment, loan, monthly, totalPayment, overpayment };
  }, [price, downPaymentPercent, rate, years]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            На главную
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Calculator className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Ипотечный калькулятор</h1>
          <p className="text-muted-foreground">
            Рассчитайте ежемесячный платёж и переплату по ипотеке
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Параметры */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">Параметры кредита</h2>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Стоимость */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Стоимость квартиры</Label>
                    <span className="text-sm font-semibold text-primary">{formatPrice(price)} ₸</span>
                  </div>
                  <Slider
                    min={5000000}
                    max={200000000}
                    step={500000}
                    value={[price]}
                    onValueChange={([v]) => setPrice(v)}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 млн</span>
                    <span>200 млн</span>
                  </div>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>

                {/* Первоначальный взнос */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Первоначальный взнос</Label>
                    <span className="text-sm font-semibold text-primary">
                      {downPaymentPercent}% — {formatPrice(result.downPayment)} ₸
                    </span>
                  </div>
                  <Slider
                    min={10}
                    max={90}
                    step={1}
                    value={[downPaymentPercent]}
                    onValueChange={([v]) => setDownPaymentPercent(v)}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>

                {/* Процентная ставка */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Процентная ставка</Label>
                    <span className="text-sm font-semibold text-primary">{rate}% годовых</span>
                  </div>
                  <Slider
                    min={5}
                    max={30}
                    step={0.5}
                    value={[rate]}
                    onValueChange={([v]) => setRate(v)}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Срок */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Срок кредита</Label>
                    <span className="text-sm font-semibold text-primary">{years} лет</span>
                  </div>
                  <Slider
                    min={1}
                    max={30}
                    step={1}
                    value={[years]}
                    onValueChange={([v]) => setYears(v)}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 год</span>
                    <span>30 лет</span>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Результат */}
          <div>
            <Card className="border-0 shadow-md sticky top-24">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">Результат расчёта</h2>
              </CardHeader>
              <CardContent className="space-y-4">

                <div className="bg-primary/5 rounded-xl p-5 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Ежемесячный платёж</div>
                  <div className="text-4xl font-bold text-primary">
                    {formatPrice(result.monthly)} ₸
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Стоимость квартиры</span>
                    <span className="font-medium">{formatPrice(price)} ₸</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Первоначальный взнос</span>
                    <span className="font-medium">{formatPrice(result.downPayment)} ₸</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Сумма кредита</span>
                    <span className="font-medium">{formatPrice(result.loan)} ₸</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Общая сумма выплат</span>
                    <span className="font-medium">{formatPrice(result.totalPayment)} ₸</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Переплата</span>
                    <span className="font-medium text-destructive">+{formatPrice(result.overpayment)} ₸</span>
                  </div>
                </div>

                <Separator />

                {/* Визуальная шкала */}
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Основной долг</span>
                    <span>Переплата</span>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-primary transition-all"
                      style={{ width: `${(result.loan / result.totalPayment) * 100}%` }}
                    />
                    <div
                      className="bg-destructive/60 transition-all"
                      style={{ width: `${(result.overpayment / result.totalPayment) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-primary font-medium">
                      {Math.round((result.loan / result.totalPayment) * 100)}%
                    </span>
                    <span className="text-destructive font-medium">
                      {Math.round((result.overpayment / result.totalPayment) * 100)}%
                    </span>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
