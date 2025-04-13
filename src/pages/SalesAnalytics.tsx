
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart, 
  Area
} from "recharts";
import { SalesData } from "@/types/salary";

const SalesAnalytics = () => {
  const [period, setPeriod] = useState("today");
  const [activeTab, setActiveTab] = useState("categories");
  
  const [salesData, setSalesData] = useState<{[key: string]: SalesData}>({
    today: {
      categories: [
        { name: "Кофе", value: 65, color: "#9b87f5" },
        { name: "Чай", value: 15, color: "#62C99C" },
        { name: "Десерты", value: 12, color: "#FF8042" },
        { name: "Прочее", value: 8, color: "#FFC658" }
      ],
      products: [
        { id: "1", name: "Эспрессо", quantity: 120, category: "Кофе" },
        { id: "2", name: "Американо", quantity: 95, category: "Кофе" },
        { id: "3", name: "Капучино", quantity: 150, category: "Кофе" },
        { id: "4", name: "Латте", quantity: 180, category: "Кофе" },
        { id: "5", name: "Чай зеленый", quantity: 70, category: "Чай" },
        { id: "6", name: "Чай черный", quantity: 65, category: "Чай" },
        { id: "7", name: "Круассан", quantity: 85, category: "Десерты" },
        { id: "8", name: "Маффин", quantity: 60, category: "Десерты" }
      ]
    },
    week: {
      categories: [
        { name: "Кофе", value: 62, color: "#9b87f5" },
        { name: "Чай", value: 18, color: "#62C99C" },
        { name: "Десерты", value: 14, color: "#FF8042" },
        { name: "Прочее", value: 6, color: "#FFC658" }
      ],
      products: [
        { id: "1", name: "Эспрессо", quantity: 820, category: "Кофе" },
        { id: "2", name: "Американо", quantity: 705, category: "Кофе" },
        { id: "3", name: "Капучино", quantity: 950, category: "Кофе" },
        { id: "4", name: "Латте", quantity: 1100, category: "Кофе" },
        { id: "5", name: "Чай зеленый", quantity: 480, category: "Чай" },
        { id: "6", name: "Чай черный", quantity: 420, category: "Чай" },
        { id: "7", name: "Круассан", quantity: 550, category: "Десерты" },
        { id: "8", name: "Маффин", quantity: 380, category: "Десерты" }
      ]
    },
    month: {
      categories: [
        { name: "Кофе", value: 59, color: "#9b87f5" },
        { name: "Чай", value: 20, color: "#62C99C" },
        { name: "Десерты", value: 16, color: "#FF8042" },
        { name: "Прочее", value: 5, color: "#FFC658" }
      ],
      products: [
        { id: "1", name: "Эспрессо", quantity: 3500, category: "Кофе" },
        { id: "2", name: "Американо", quantity: 2800, category: "Кофе" },
        { id: "3", name: "Капучино", quantity: 4200, category: "Кофе" },
        { id: "4", name: "Латте", quantity: 4800, category: "Кофе" },
        { id: "5", name: "Чай зеленый", quantity: 2100, category: "Чай" },
        { id: "6", name: "Чай черный", quantity: 1900, category: "Чай" },
        { id: "7", name: "Круассан", quantity: 2400, category: "Десерты" },
        { id: "8", name: "Маффин", quantity: 1600, category: "Десерты" }
      ]
    }
  });

  // Данные для графика выручки
  const revenueData = {
    today: [
      { time: "9:00", revenue: 3500 },
      { time: "10:00", revenue: 5200 },
      { time: "11:00", revenue: 6800 },
      { time: "12:00", revenue: 8900 },
      { time: "13:00", revenue: 11000 },
      { time: "14:00", revenue: 9800 },
      { time: "15:00", revenue: 8200 },
      { time: "16:00", revenue: 7500 },
      { time: "17:00", revenue: 9300 },
      { time: "18:00", revenue: 12500 },
      { time: "19:00", revenue: 10800 },
      { time: "20:00", revenue: 8600 }
    ],
    week: [
      { time: "Пн", revenue: 45000 },
      { time: "Вт", revenue: 42000 },
      { time: "Ср", revenue: 48000 },
      { time: "Чт", revenue: 51000 },
      { time: "Пт", revenue: 68000 },
      { time: "Сб", revenue: 82000 },
      { time: "Вс", revenue: 76000 }
    ],
    month: [
      { time: "Нед 1", revenue: 320000 },
      { time: "Нед 2", revenue: 340000 },
      { time: "Нед 3", revenue: 360000 },
      { time: "Нед 4", revenue: 380000 }
    ]
  };

  // Данные для метрик
  const metricsData = {
    today: {
      revenue: "83000 ₽",
      profit: "41500 ₽",
      averageCheck: "358 ₽",
      checks: 232
    },
    week: {
      revenue: "412000 ₽",
      profit: "206000 ₽",
      averageCheck: "372 ₽",
      checks: 1108
    },
    month: {
      revenue: "1420000 ₽",
      profit: "710000 ₽",
      averageCheck: "365 ₽",
      checks: 3890
    }
  };

  // Текущие данные на основе выбранного периода
  const currentSalesData = salesData[period];
  const currentRevenueData = revenueData[period as keyof typeof revenueData];
  const currentMetrics = metricsData[period as keyof typeof metricsData];

  // Сортировка продуктов по количеству для столбчатой диаграммы
  const sortedProducts = [...currentSalesData.products]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Аналитика продаж</h1>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Сегодня</SelectItem>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Card className="metric-card">
            <CardHeader className="p-3 pb-0">
              <CardDescription>Выручка</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-xl font-bold">{currentMetrics.revenue}</p>
            </CardContent>
          </Card>
          <Card className="metric-card">
            <CardHeader className="p-3 pb-0">
              <CardDescription>Прибыль</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-xl font-bold">{currentMetrics.profit}</p>
            </CardContent>
          </Card>
          <Card className="metric-card">
            <CardHeader className="p-3 pb-0">
              <CardDescription>Средний чек</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-xl font-bold">{currentMetrics.averageCheck}</p>
            </CardContent>
          </Card>
          <Card className="metric-card">
            <CardHeader className="p-3 pb-0">
              <CardDescription>Кол-во чеков</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-xl font-bold">{currentMetrics.checks}</p>
            </CardContent>
          </Card>
        </div>
          
        <Card>
          <CardHeader>
            <CardTitle>Динамика выручки</CardTitle>
            <CardDescription>
              График выручки за {period === "today" ? "день" : period === "week" ? "неделю" : "месяц"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={currentRevenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ₽`, "Выручка"]} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Выручка" 
                    fill="#9b87f5" 
                    stroke="#7E69AB" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">По категориям</TabsTrigger>
            <TabsTrigger value="products">По продуктам</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Распределение продаж по категориям</CardTitle>
                <CardDescription>
                  Процентное соотношение категорий в общей структуре продаж
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentSalesData.categories}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {currentSalesData.categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Топ продаваемых товаров</CardTitle>
                <CardDescription>
                  Наиболее популярные товары по количеству продаж
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sortedProducts}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fontSize: 14 }}
                        width={100}
                      />
                      <Tooltip />
                      <Bar 
                        dataKey="quantity" 
                        name="Количество" 
                        fill="#9b87f5" 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SalesAnalytics;
