export function parseBase64Image(dataString: string) {
  if (!dataString.length) {
    return null
  }

  if (!dataString.startsWith('data:')) {
    // Предположим PNG, если нет префикса
    dataString = `data:image/png;base64,${dataString}`;
  }

  const matches = dataString.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64');
  }

  const mime = matches[1].split(';')[0]; // Извлекаем только MIME-тип
  const extension = mime.split('/')[1];

  return {
    mime,
    buffer: Buffer.from(matches[2], 'base64'),
    name: `upload-${Date.now()}.${extension}`,
  };
}
