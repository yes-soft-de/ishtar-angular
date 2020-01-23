import fs from 'fs';
import jsonxml from 'jsontoxml';
import axio from 'axios';

const baseAPI = 'http://ishtar-art.de/ishtar-backend/public';

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
const root_path = 'http://www.ishtar-art.de';
let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

let newDate = new Date(Date.now());

for (const path of urls) {
    xml += '<url>';
    xml += `<loc>${path}</loc>`;
    console.log(`Adding Path ${path}`);
    xml += `<lastmod>${newDate.toDateString()} ${newDate.toTimeString()}</lastmod>`;
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
            console.log(`Adding Path /painting/${i.id}`);
            xml += `<lastmod>${newDate.toDateString()} ${newDate.toTimeString()}</lastmod>`;
            xml += `<changefreq>monthly</changefreq>`;
            xml += `<priority>0.8</priority>`;
            xml += '</url>';
        }

        axio.get(`${baseAPI}/artists`).then(
            (artistResult) => {
                console.log('Got Artist List');
                for (const i of artistResult.data.Data) {
                    xml += '<url>';
                    xml += `<loc>${root_path}/artist/${i.id}</loc>`;
                    console.log(`Adding Path /artist/${i.id}`);

                    xml += `<lastmod>${newDate.toDateString()} ${newDate.toTimeString()}</lastmod>`;
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
