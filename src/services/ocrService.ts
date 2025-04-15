
import { toast } from "sonner";

// Типы для результатов OCR
interface OCRResult {
  number?: string;
  date?: string;
  amount?: string;
  items?: {
    name: string;
    category: string;
    quantity: number;
    price: number;
  }[];
}

// Константы для тестового распознавания - в реальном приложении здесь будет интеграция с API
const CATEGORY_MAPPINGS: Record<string, string> = {
  "кофе": "Кофе",
  "молоко": "Молоко и сливки",
  "сливки": "Молоко и сливки",
  "стакан": "Стаканы",
  "крышка": "Стаканы",
  "сироп": "Сиропы",
  "сахар": "Продукты",
  "печенье": "Выпечка",
  "круассан": "Выпечка",
  "торт": "Выпечка",
};

/**
 * Эмуляция распознавания накладной из изображения
 * В реальном приложении здесь будет интеграция с OCR-сервисом (Google ML Kit, Tesseract и т.д.)
 */
export const recognizeInvoiceFromImage = async (file: File): Promise<OCRResult> => {
  // Имитация запроса к OCR-сервису с задержкой
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // В реальной реализации здесь будет анализ изображения
        // Возвращаем тестовые данные для демонстрации
        
        // Генерируем случайный номер накладной
        const invoiceNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // Генерируем дату (последние 30 дней)
        const today = new Date();
        const randomDaysAgo = Math.floor(Math.random() * 30);
        const randomDate = new Date(today);
        randomDate.setDate(today.getDate() - randomDaysAgo);
        const dateString = randomDate.toISOString().split('T')[0]; // YYYY-MM-DD
        
        // Генерируем случайную сумму от 1000 до 15000
        const totalAmount = (Math.random() * 14000 + 1000).toFixed(2);
        
        // Генерируем случайные позиции в накладной
        const categories = Object.values(CATEGORY_MAPPINGS);
        const uniqueCategories = [...new Set(categories)];
        const itemsCount = Math.floor(Math.random() * 8) + 3; // 3-10 позиций
        
        const items = Array.from({ length: itemsCount }, (_, i) => {
          const randomCategory = uniqueCategories[Math.floor(Math.random() * uniqueCategories.length)];
          const itemNames: Record<string, string[]> = {
            "Кофе": ["Кофе Арабика", "Кофе Робуста", "Кофе в зернах", "Кофе молотый"],
            "Молоко и сливки": ["Молоко 3.2%", "Молоко 2.5%", "Сливки 10%", "Сливки 33%", "Кокосовое молоко"],
            "Стаканы": ["Стаканы 250мл", "Крышки для стаканов", "Стаканы 350мл", "Стаканы бумажные"],
            "Сиропы": ["Сироп ванильный", "Сироп карамельный", "Сироп кокосовый", "Сироп шоколадный"],
            "Продукты": ["Сахар", "Мед", "Корица", "Какао", "Шоколад"],
            "Выпечка": ["Круассаны", "Маффины", "Печенье", "Пончики"]
          };
          
          const possibleNames = itemNames[randomCategory] || ["Товар " + (i + 1)];
          const name = possibleNames[Math.floor(Math.random() * possibleNames.length)];
          
          const quantity = Math.floor(Math.random() * 10) + 1;
          const price = Math.floor(Math.random() * 1000) + 100;
          
          return {
            name,
            category: randomCategory,
            quantity,
            price
          };
        });
        
        // Возвращаем результат распознавания
        resolve({
          number: invoiceNumber,
          date: dateString,
          amount: totalAmount,
          items
        });
      } catch (error) {
        console.error("Error in OCR:", error);
        toast("Ошибка распознавания");
        // В случае ошибки возвращаем пустой результат
        resolve({});
      }
    }, 1500); // Имитация задержки 1.5 секунды для обработки
  });
};

/**
 * Функция для интеграции с Google ML Kit
 * Это заглушка, в реальном приложении здесь будет интеграция с нативным SDK
 */
export const setupGoogleMlKit = async () => {
  console.log("Google ML Kit initialization would happen here");
  // В реальном приложении здесь будет инициализация ML Kit
  
  // Для Android:
  // Добавить Google ML Kit в build.gradle и инициализировать распознаватель текста
  
  // Для iOS:
  // Добавить ML Kit в Podfile и инициализировать распознаватель текста
  
  return {
    isAvailable: true,
    version: "1.0.0"
  };
};

/**
 * Проверка существования накладной по номеру
 */
export const checkInvoiceExists = (invoiceNumber: string): boolean => {
  try {
    const savedInvoices = localStorage.getItem("invoices");
    if (!savedInvoices) return false;
    
    const invoices = JSON.parse(savedInvoices);
    return invoices.some((invoice: any) => invoice.number === invoiceNumber);
  } catch (error) {
    console.error("Error checking invoice existence:", error);
    return false;
  }
};

/**
 * Сохранение накладной в "базу данных" (localStorage)
 */
export const saveInvoiceToDatabase = (invoice: any): boolean => {
  try {
    const savedInvoices = localStorage.getItem("invoices") || "[]";
    const invoices = JSON.parse(savedInvoices);
    
    invoices.push({
      ...invoice,
      id: Date.now().toString(),
      verified: false
    });
    
    localStorage.setItem("invoices", JSON.stringify(invoices));
    return true;
  } catch (error) {
    console.error("Error saving invoice:", error);
    return false;
  }
};
