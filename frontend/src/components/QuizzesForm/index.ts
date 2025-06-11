// Массивы опций для удобства, можно вынести в отдельный файл
export const rightsOptions = [
  { label: 'Да', value: 'yes' },
  { label: 'Нет', value: 'no' },
]

export const regionOptions = [
  { label: 'Морской путь', abbr: 'МП', value: 'mp' },
  { label: 'Внутренние воды', abbr: 'ВВ', value: 'vp' },
  { label: 'Внутренние водные пути', abbr: 'ВВП', value: 'vvp' },
]

export const vesselOptions = [
  { label: 'Гидроцикл', value: 'scooter', icon: 'runnningsvg-jetski' },
  { label: 'Маломерное парусное судно', value: 'sail', icon: 'runningsvg-yacht' },
  { label: 'Маломерное моторное судно', value: 'motor', icon: 'motor' },
  { label: 'Судно особой конструкции', value: 'special', icon: '3289767' },
]

export const QUIZZES_FORM_OPTIONS = {
  certificate: {
    title: 'Шаг 1. Получали ли вы права ранее?',
    description: 'Если у вас уже есть права и вы хотите открыть новые категории. Количество вопросов и время значительно меньше',
    type: 'radio',
    items: [
      { label: 'Да', value: 'yes' },
      { label: 'Нет', value: 'no' },
    ],
  },

  regions: {
    title: 'Шаг 2. Выберите тип региона',
    description: 'Вы можете выбрать несколько регионов, от этого будет зависить количество итоговых вопросов, время и количество попыток',
    type: 'checkbox',
    items: [
      { label: 'Морской путь', abbr: 'МП', value: 'mp' },
      { label: 'Внутренние воды', abbr: 'ВВ', value: 'vp' },
      { label: 'Внутренние водные пути', abbr: 'ВВП', value: 'vvp' },
    ],
  },

  vessels: {
    title: 'Шаг 3. Выберите тип судна',
    description: 'Вы можете выбрать несколько типов судов, от этого будет зависить количество итоговых вопросов, время и количество попыток',
    type: 'checkbox',
    items: [
      { label: 'Гидроцикл', value: 'scooter', icon: 'runnningsvg-jetski' },
      { label: 'Маломерное парусное судно', value: 'sail', icon: 'runningsvg-yacht' },
      { label: 'Маломерное моторное судно', value: 'motor', icon: 'motor' },
      { label: 'Судно особой конструкции', value: 'special', icon: '3289767' },
    ],
  },

  type: {
    title: 'Шаг 4. Выберете тренажер или пробный экзамен',
    description: 'Режим «Экзамен» - Предназначен для итоговой проверки знаний и максимально имитирует реальное сда-ние квалификационного теста<br><br>Режим «Тренажёр» - Это учебная среда без жёстких ограничений',
    type: 'radio',
    items: [
      { label: 'Экзамен', value: 'exam' },
      { label: 'Тренажер', value: 'quiz' },
    ],
  },
}
