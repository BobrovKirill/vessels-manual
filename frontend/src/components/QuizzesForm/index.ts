// Массивы опций для удобства, можно вынести в отдельный файл
export const rightsOptions = [
  { label: 'Есть', value: 'yes' },
  { label: 'Нету', value: 'no' },
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
