import { JSDOM } from 'jsdom';

async function getDom(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);

  return dom.window.document;
}

const getImage = (element: Element) => {
  const img = element.querySelector('img');
  return img?.getAttribute('src') || '';
};

const getCleanText = (element) => {
  let result = '';

  element.querySelectorAll('span').forEach((span) => {
    let text = span.textContent.replace(/[\n\r\t\u00A0]+/g, '');

    if (/^\s/.test(span.textContent)) {
      result += ' ';
    }

    result += text.replace(/\s+/g, '');
  });

  return result.replace(/\s+/g, ' ').trim();
};

export async function getPdfUrls(url: string, type: string): Promise<{ type: string; urls: string[] }> {
  const document = await getDom(url);
  const urls: string[] = [];

  const links = document.querySelectorAll('a[href$=".pdf"]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const fullUrl = href.startsWith('http') ? href : new URL(href, url).href;
    urls.push(fullUrl);
  });

  return {
    type,
    urls
  };
}
export async function getUrlListByGroups(
  url: string,
  groups: {
    type: string;
    words: string[];
  }[]
): Promise<Record<string, string>> {

  const document = await getDom(url);
  const linksArray: Record<string, string> = {};
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const textContent = link.textContent?.toLowerCase().trim() || "";
    const fullHref = new URL(href, url).href;

    groups.forEach(({ type, words }) => {
      const match = words.every(word => textContent.includes(word));
      if (match && !linksArray[type]) {
        linksArray[type] = fullHref;
      }
    });
  });

  return linksArray;
}

export async function getParsedHtmlTableData(url: string) {
  const document = await getDom(url)

  const result = [];

  const tables = document.querySelectorAll('table');
  tables.forEach((table, tableIndex) => {
    table.querySelectorAll('tr').forEach((tr, trIndex) => {
      if (trIndex === 0 || (tableIndex === 0 && trIndex === 1)) {
        return
      }

      const tds = Array.from(tr.querySelectorAll('td'))
      const index = getCleanText(tds[0]).replace(/\./g, '').trim()
      const question =  getCleanText(tds[1])
      const image = getImage(tds[2])
      const answer = getCleanText(tds[3]).replace(/[•●▪‣◦○–—·\u2022\uF0B7]/g, '').trim();
      result.push({index, question, image, answer})
    })
  });

  return result
}