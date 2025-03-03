// author: Yihui Xie
// license: MIT
// source: https://cdn.jsdelivr.net/npm/@xiee/utils@1.14.7/js/right-quote.js
// originally to right-align a quote footer if it starts with ---; now it just
// right-align all paragraphs that start with em-dashes
[...document.getElementsByTagName('p')].forEach(p => {
    if (/^(—|―|---)/.test(p.textContent)) p.style.textAlign = 'right';
  });