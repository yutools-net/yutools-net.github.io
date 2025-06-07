document.addEventListener('DOMContentLoaded', function() {

    function initializeHamburgerMenu(containerElement) {
        const menuToggle = containerElement.querySelector('.menu-toggle');
        const mainNavigation = containerElement.querySelector('#main-navigation');

        if (menuToggle && mainNavigation) {
            menuToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
                this.setAttribute('aria-expanded', String(!isExpanded));
                mainNavigation.classList.toggle('is-active'); // CSSで .is-active のスタイルを定義
                
                // ハンバーガーアイコン自体の見た目を変更する場合 (例: X にする)
                const hamburgerIcon = this.querySelector('.hamburger-icon');
                if (hamburgerIcon) {
                    hamburgerIcon.classList.toggle('is-active'); 
                }
            });
        } else {
            // ヘッダーが動的に読み込まれるため、読み込み後に要素が見つからない場合は警告を出す
            if (containerElement.id === 'header-placeholder') { // ヘッダープレースホルダー内でのみ警告
                 console.warn("ハンバーガーメニューのボタンまたはナビゲーション要素が、読み込まれたヘッダー内に見つかりませんでした。header.htmlの構造を確認してください。");
            }
        }
    }

    // --- ヘッダーを読み込んで挿入する処理 ---
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        const headerHtmlFile = '/header.html'; // ルートからのパス

        fetch(headerHtmlFile)
            .then(response => {
                if (!response.ok) {
                    console.error("ヘッダー読み込み fetch - 応答がNGでした。ステータス:", response.status, response.statusText, "URL:", response.url);
                    throw new Error('Network response was not ok for ' + headerHtmlFile);
                }
                return response.text();
            })
            .then(html => {
                if (html.trim() === "") {
                    console.warn("ヘッダー読み込み fetch - 取得したHTMLが空です。header.htmlの内容を確認してください。");
                }
                headerPlaceholder.innerHTML = html;
                initializeHamburgerMenu(headerPlaceholder); // ★ヘッダー読み込み後にハンバーガーメニュー初期化
            })
            .catch(error => {
                console.error('ヘッダー読み込み fetch - 処理中にエラーが発生しました (catchブロック):', error);
                headerPlaceholder.innerHTML = '<p style="text-align:center; color:red;">ヘッダーの読み込みに失敗しました。</p>';
            });
    } else {
        // ヘッダープレースホルダーがないページもあるかもしれないので、エラーではなくログ出力なし、または警告程度に留める
        // console.warn('ヘッダー挿入用の要素 (#header-placeholder) がHTML内に見つかりませんでした。');
    }

    // --- フッターを読み込んで挿入する処理 ---
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        const footerHtmlFile = '/footer.html'; // ルートからのパス

        fetch(footerHtmlFile)
            .then(response => {
                if (!response.ok) {
                    console.error("フッター読み込み fetch - 応答がNGでした。ステータス:", response.status, response.statusText, "URL:", response.url);
                    throw new Error('Network response was not ok for ' + footerHtmlFile);
                }
                return response.text();
            })
            .then(html => {
                if (html.trim() === "") {
                    console.warn("フッター読み込み fetch - 取得したHTMLが空です。footer.htmlの内容を確認してください。");
                }
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('フッター読み込み fetch - 処理中にエラーが発生しました (catchブロック):', error);
                footerPlaceholder.innerHTML = '<p style="text-align:center; color:red;">フッターの読み込みに失敗しました。</p>';
            });
    } else {
        // フッタープレースホルダーがないページもあるかもしれないので、エラーではなくログ出力なし、または警告程度に留める
        // console.warn('フッター挿入用の要素 (#footer-placeholder) がHTML内に見つかりませんでした。');
    }
});