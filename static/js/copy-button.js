// author: Yihui Xie
// license: MIT
// source: https://cdn.jsdelivr.net/npm/@xiee/utils@1.14.7/js/copy-button.js
// add a button to elements to copy their content: https://yihui.org/en/2023/09/copy-button/
(d => {
    const cfg = d.currentScript?.dataset;
    d.querySelectorAll(cfg?.selector || 'pre>code, .copy-this').forEach(el => {
      const btn = d.createElement('span'), cls = btn.classList,
        c1 = 'copy-success', c2 = 'copy-fail', pre = el.parentNode,
        is_code = el.tagName === 'CODE' && pre?.tagName === 'PRE';
      btn.className = 'copy-button';
      // temporarily add a class to the button (as a feedback to copy action)
      function feedback(c) {
        cls.add(c); setTimeout(() => cls.remove(c), 1000);
      }
      // for code.code-fence in div.fenced-chunk (from litedown), copy the whole chunk's source
      function getText() {
        return (is_code && el.classList.contains('code-fence') && pre.parentNode?.classList.contains('fenced-chunk')) ?
          [...pre.parentNode.querySelectorAll('code[class]')]
          // next line changed by @LoganQiu
          // why use textContent instead of innerText? It's abnormal.
          .map(code => code.textContent.replace(/\n$/, '')).join('\n') : el.textContent;
      }
      btn.onclick = () => navigator.clipboard.writeText(getText()).then(
        () => feedback(c1), () => feedback(c2)
      );
      // add the button to <pre> for <code> because <code>'s innerHTML' may be
      // changed later, e.g., by syntax highlighting libraries
      const p = is_code ? pre : el;
      // add the button only if it has not been added
      p.querySelector('.copy-button') || p.append(btn);
      p.hasAttribute('tabIndex') || (p.tabIndex = '0');
      getComputedStyle(p).position === 'static' && (p.style.position = 'relative');
    });
  })(document);
  