import fs from 'fs';
import jsonxml from 'jsontoxml';
import axio from 'axios';

const baseAPI = 'https://ishtar-art.de/ishtar-backend/public';

const urls = [
  'artist-list',
  'painting-list',
  'art-schools-list',
  'tos',
  'privacy',
  'about-us',
  'faq',
  'imprint',
  'data-processing',
  'about-ishtar'
];
const root_path = 'https://ishtar-art.de';
const root_path_de = root_path + '/de';


let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">';

let newDate = new Date(Date.now());

// region English
for (const path of urls) {
  xml += '<url>';
  xml += `<loc>${root_path}/${path}</loc>`;
  console.log(`Adding Path ${path}`);
  xml += `<xhtml:link
               rel="alternate"
               hreflang="de"
               href="${root_path_de}/${path}"/>`;
  // xml += `<lastmod>${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}T13:15:30Z</lastmod>`;
  xml += `<changefreq>monthly</changefreq>`;
  xml += `<priority>0.8</priority>`;
  xml += '</url>';
}

axio.get(`${baseAPI}/paintings`).then(
  (result) => {
    console.log('Got Painting List');
    for (const i of result.data.Data) {
      xml += '<url>';
      xml += `<loc>${root_path}/painting/${i.id}</loc>`;
      xml += `<xhtml:link
               rel="alternate"
               hreflang="de"
               href="${root_path_de}/painting/${i.id}"/>`;
      // xml += `<lastmod>${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}T13:15:30Z</lastmod>`;
      xml += `<changefreq>monthly</changefreq>`;
      xml += `<image:image>`;
      xml += `<image:loc>${i.image}</image:loc>`;
      xml += `<image:title> ${i.name.replace('&', 'and')}</image:title>`;
      xml += `<image:geo_location>Berlin, Germany</image:geo_location>`;
      xml += `</image:image>`;
      xml += `<priority>0.8</priority>`;
      xml += '</url>';
    }

    axio.get(`${baseAPI}/artists`).then(
      (artistResult) => {
        console.log('Got Artist List');
        for (const i of artistResult.data.Data) {
          xml += '<url>';
          xml += `<loc>${root_path}/artist/${i.id}</loc>`;
          xml += `<xhtml:link
               rel="alternate"
               hreflang="de"
               href="${root_path_de}/artist/${i.id}"/>`;
          // xml += `<lastmod>${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}T13:15:30Z</lastmod>`;
          xml += `<changefreq>monthly</changefreq>`;
          xml += `<priority>0.7</priority>`;

          xml += '</url>';
        }

        xml += '</urlset>';

        fs.writeFileSync('sitemap.xml', xml, (err) => {
          console.log(err);
        });
      }
    );
  }
);

// endregion
