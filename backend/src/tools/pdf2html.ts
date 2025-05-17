const secretKey = 'secret_0nOtLLJnWy6fmzbf'
const convertapi = require('convertapi')(secretKey);

export function getHtmlUrl(pdfUrl: string)  {
  return convertapi.convert('html', {
    File: pdfUrl
  }, 'pdf').then(function(result: any) {
    return result.response?.Files[0].Url || '';
  });
}