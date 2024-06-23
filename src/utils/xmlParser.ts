import type { Item } from "@/stores/currencyStore";

  export function parseItemsXML(xmlText: string): Item[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
    
    const items = xmlDoc.querySelectorAll('item');
    const resultItems = [];

    for(const item of items) {
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const fullname = item.querySelector('fullname')?.textContent || '';
      const quant = item.querySelector('quant')?.textContent || '';

      const rate = Number(description) / Number(quant);

      resultItems.push({
        title,
        rate,
        fullname,
      })
    }

  
    return resultItems;
  }