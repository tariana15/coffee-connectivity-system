
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import recipeData from "../../techcard/texcard.json";
import { ProductIngredient } from "@/types/salary";

interface Recipe {
  "#Вид напитка": string;
  "#Название": string;
  "#Ингредиенты": string;
  "#Приготовление": string;
  ingredients?: ProductIngredient[];
  category?: string;
}

const RecipeCards = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        
        const processedRecipes = recipeData.map((recipe: Recipe) => {
          const ingredientsText = recipe["#Ингредиенты"];
          const ingredientsList: ProductIngredient[] = ingredientsText
            .split(",")
            .map(item => {
              const parts = item.trim().split(" ");
              let amount = 0;
              let unit = "";
              let name = "";
              
              if (parts.length >= 3) {
                amount = parseFloat(parts[0]) || 0;
                unit = parts[1];
                name = parts.slice(2).join(" ");
              } else if (parts.length === 2) {
                amount = parseFloat(parts[0]) || 1;
                name = parts[1];
              } else {
                name = parts[0];
              }
              
              return { name, amount, unit };
            });
          
          // Используем первую колонку (#Вид напитка) для определения категории
          let category = "other";
          const drinkType = recipe["#Вид напитка"].toLowerCase();
          
          if (drinkType.includes("кофе") || drinkType.includes("классические")) {
            category = "coffee";
          } else if (drinkType.includes("чай")) {
            category = "tea";
          } else if (drinkType.includes("десерт") || drinkType.includes("выпечка")) {
            category = "dessert";
          }
          
          return {
            ...recipe,
            ingredients: ingredientsList,
            category
          };
        });
        
        setRecipes(processedRecipes);
      } catch (err) {
        setError("Ошибка при загрузке техкарты");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      </MainLayout>
    );
  }

  const categories = ["all", "coffee", "tea", "dessert", "other"];
  const categoryNames = {
    all: "Все",
    coffee: "Кофе",
    tea: "Чай", 
    dessert: "Десерты",
    other: "Прочее"
  };

  const filteredRecipes = activeCategory === "all" 
    ? recipes 
    : recipes.filter(recipe => recipe.category === activeCategory);

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Техкарта напитков</h1>
        
        <Tabs 
          value={activeCategory} 
          onValueChange={setActiveCategory} 
          className="mb-6"
        >
          <TabsList className="w-full grid grid-cols-5">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {categoryNames[category as keyof typeof categoryNames]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{recipe["#Название"]}</CardTitle>
                    <CardDescription>{recipe["#Вид напитка"]}</CardDescription>
                  </div>
                  <Badge 
                    className={`
                      ${recipe.category === 'coffee' ? 'bg-purple-100 text-purple-800' : ''}
                      ${recipe.category === 'tea' ? 'bg-green-100 text-green-800' : ''}
                      ${recipe.category === 'dessert' ? 'bg-orange-100 text-orange-800' : ''}
                      ${recipe.category === 'other' ? 'bg-gray-100 text-gray-800' : ''}
                    `}
                  >
                    {categoryNames[recipe.category as keyof typeof categoryNames]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Ингредиенты:</h3>
                    <p className="text-sm">{recipe["#Ингредиенты"]}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Приготовление:</h3>
                    <p className="text-sm whitespace-pre-line">{recipe["#Приготовление"]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default RecipeCards;
