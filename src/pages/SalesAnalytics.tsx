
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CartesianGrid
} from "recharts";
import { SalesData } from "@/types/salary";

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState<SalesData>({
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
  });

  // Sort products by quantity for the bar chart
  const sortedProducts = [...salesData.products]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Аналитика продаж</h1>

        <Tabs defaultValue="categories" className="space-y-4">
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
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesData.categories}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salesData.categories.map((entry, index) => (
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
                <div className="h-[400px] w-full">
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
