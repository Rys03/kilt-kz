'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, CITIES } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AddListingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'sale' as 'sale' | 'rent',
    price: '',
    city: '',
    address: '',
    rooms: '1',
    area_sqm: '',
    floor: '',
    total_floors: '',
    year_built: '',
    has_parking: false,
    has_elevator: false,
    contact_name: '',
    contact_phone: '',
    image_url: '',
    model_3d_url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const listingData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        price: parseInt(formData.price),
        city: formData.city,
        address: formData.address,
        rooms: parseInt(formData.rooms),
        area_sqm: parseFloat(formData.area_sqm),
        floor: formData.floor ? parseInt(formData.floor) : null,
        total_floors: formData.total_floors ? parseInt(formData.total_floors) : null,
        year_built: formData.year_built ? parseInt(formData.year_built) : null,
        has_parking: formData.has_parking,
        has_elevator: formData.has_elevator,
        contact_name: formData.contact_name,
        contact_phone: formData.contact_phone,
        images: formData.image_url ? [formData.image_url] : [],
        model_3d_url: formData.model_3d_url || null,
        status: 'active' as const,
      };

      const { data, error } = await supabase
        .from('listings')
        .insert([listingData])
        .select();

      if (error) throw error;

      toast({
        title: 'Объявление создано!',
        description: 'Ваше объявление успешно опубликовано',
      });

      router.push(`/listing/${data[0].id}`);
    } catch (error) {
      console.error('Error creating listing:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось создать объявление. Попробуйте еще раз.',
      });
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Разместить объявление</h1>
          <p className="text-muted-foreground">
            Заполните форму для публикации объявления о недвижимости
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-0 shadow-md mb-6">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold">Основная информация</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="title" className="mb-2 block">
                  Заголовок <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Например: 3-комнатная квартира в центре"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="text-base"
                />
              </div>

              <div>
                <Label htmlFor="description" className="mb-2 block">
                  Описание <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Опишите вашу недвижимость..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="text-base resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">
                    Тип объявления <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(val: 'sale' | 'rent') =>
                      setFormData((prev) => ({ ...prev, type: val }))
                    }
                  >
                    <SelectTrigger className="text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Продажа</SelectItem>
                      <SelectItem value="rent">Аренда</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price" className="mb-2 block">
                    Цена <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Введите сумму"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md mb-6">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold">Местоположение</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">
                    Город <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.city}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, city: val }))
                    }
                  >
                    <SelectTrigger className="text-base">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address" className="mb-2 block">
                    Адрес <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="ул. Название, номер дома"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md mb-6">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold">Характеристики</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-2 block">
                    Количество комнат <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.rooms}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, rooms: val }))
                    }
                  >
                    <SelectTrigger className="text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 комната</SelectItem>
                      <SelectItem value="2">2 комнаты</SelectItem>
                      <SelectItem value="3">3 комнаты</SelectItem>
                      <SelectItem value="4">4 комнаты</SelectItem>
                      <SelectItem value="5">5 комнат</SelectItem>
                      <SelectItem value="6">6+ комнат</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area_sqm" className="mb-2 block">
                    Площадь (м²) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="area_sqm"
                    name="area_sqm"
                    type="number"
                    step="0.1"
                    placeholder="Площадь"
                    value={formData.area_sqm}
                    onChange={handleChange}
                    required
                    className="text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="year_built" className="mb-2 block">
                    Год постройки
                  </Label>
                  <Input
                    id="year_built"
                    name="year_built"
                    type="number"
                    placeholder="Например: 2020"
                    value={formData.year_built}
                    onChange={handleChange}
                    className="text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="floor" className="mb-2 block">
                    Этаж
                  </Label>
                  <Input
                    id="floor"
                    name="floor"
                    type="number"
                    placeholder="Номер этажа"
                    value={formData.floor}
                    onChange={handleChange}
                    className="text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="total_floors" className="mb-2 block">
                    Всего этажей
                  </Label>
                  <Input
                    id="total_floors"
                    name="total_floors"
                    type="number"
                    placeholder="Количество этажей"
                    value={formData.total_floors}
                    onChange={handleChange}
                    className="text-base"
                  />
                </div>
              </div>

              <Separator className="my-2" />

              <div className="space-y-3">
                <Label className="text-base">Удобства</Label>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_parking"
                      checked={formData.has_parking}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          has_parking: checked as boolean,
                        }))
                      }
                    />
                    <label htmlFor="has_parking" className="text-sm cursor-pointer">
                      Парковка
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_elevator"
                      checked={formData.has_elevator}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          has_elevator: checked as boolean,
                        }))
                      }
                    />
                    <label htmlFor="has_elevator" className="text-sm cursor-pointer">
                      Лифт
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md mb-6">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold">Фото</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="image_url" className="mb-2 block">
                  Ссылка на фото
                </Label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="text-base"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Вставьте прямую ссылку на изображение недвижимости
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md mb-6">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold">3D модель</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="model_3d_url" className="mb-2 block">
                  Ссылка на 3D модель
                </Label>
                <Input
                  id="model_3d_url"
                  name="model_3d_url"
                  type="url"
                  placeholder="https://example.com/3d-model"
                  value={formData.model_3d_url}
                  onChange={handleChange}
                  className="text-base"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Вставьте ссылку на 3D модель или виртуальный тур объекта
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md mb-6">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold">Контактная информация</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_name" className="mb-2 block">
                    Ваше имя <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact_name"
                    name="contact_name"
                    placeholder="Как к Вам обращаться"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                    className="text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="contact_phone" className="mb-2 block">
                    Телефон <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact_phone"
                    name="contact_phone"
                    type="tel"
                    placeholder="+7 XXX XXX XX XX"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    required
                    className="text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading} className="px-8">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Опубликовать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
