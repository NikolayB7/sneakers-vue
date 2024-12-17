import { createI18n } from 'vue-i18n';

// Переводы для разных языков
const messages = {
  en: {
    logo_text:'Shop the best sneakers',
    bookmarks: 'Bookmarks',
    profile: 'Profile',
    all_sneakers: 'All sneakers',
    filter:{
      name:'By name',
      price_up:'By price (expensive)',
      price_down:'By price (cheap)',
      search:'Search'
    },
    cart:{
      title: 'Cart',
      title_empty: 'Cart is empty',
      empty_description: 'Add at least one pair of sneakers to place an order.',
      order_success: 'Order placed!',
      order_description: 'Ваш заказ #{order_number} скоро будет передан курьерской доставке',
      total: 'Total',
      tax: 'Tax',
      order_btn: 'Place order'
    }
  },
  ru: {
    logo_text:'Магазин лучших кроссовок',
    bookmarks: 'Закладки',
    profile: 'Профиль',
    all_sneakers: 'Все кроссовки',
    filter:{
      name:'По названию',
      price_up:'По цене (дорогие)',
      price_down:'По цене (дешевые)',
      search:'Поиск'
    },
    cart:{
      title:'Корзина',
      title_empty:'Корзина пустая',
      empty_description:'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.',
      order_success:'Заказ оформлен!',
      order_description:'Ваш заказ #{order_number} скоро будет передан курьерской доставке',
      total:'Итого',
      tax:'Налог',
      order_btn:'Оформить заказ'
    }
  },
};

// Инициализация i18n
const i18n = createI18n({
  locale: 'en', // Язык по умолчанию
  fallbackLocale: 'en', // Язык по умолчанию, если перевод не найден
  messages, // Объект переводов
});

export default i18n;
