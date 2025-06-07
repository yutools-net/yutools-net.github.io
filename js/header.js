// Google Analytics
(function(){
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-YGMQRWDWV3'; // ←アナリティクスIDに変更
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-YGMQRWDWV3'); // ←アナリティクスIDに変更
})();

// Google AdSense（公式推奨形式）
(function(){
  var ad = document.createElement('script');
  ad.async = true;
  ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8070154221542267'; // ← あなたのID
  ad.crossOrigin = 'anonymous';
  document.head.appendChild(ad);
})();
