# READON short promo

READON（リードン）の実画面を使った 9:16 ショート動画です。

- 出力: 1080 x 1920 / 30fps / 20秒
- モード: app-promo
- 実画面: Cloudflare 本番を Playwright で iPhone 相当として自動操作・撮影
- 方針: 架空ボタンや架空機能を足さず、「好きなテーマ → 難易度等を選ぶ → Readerで訳/解説」の実フローを見せる
- 重要な文字は TikTok / Reels の右側・最下部UIを避ける

## Design brief

- Design thesis: READONの世界観と実UIを主役にした、静かだがテンポのある縦型プロモ
- Focal object: 実際のREADONスマホ画面
- Hierarchy: フック → 実操作 → Readerの結果 → READON名
- Grid: 左右72px以上、下部CTAを最下端へ置かない
- Type: 日本語はNoto Sans JP、1画面1メッセージ
- Palette: READONの暗い背景 + cyan 1色を主アクセント
- Motion: hold → action → result → settle
- Avoid: 架空UI、意味のない常時ズーム、複数CTA、細かい説明文

## Capture

~~~bash
npm install
npx playwright install --with-deps chromium
npm run capture
~~~

本番URLはデフォルトで以下です。

~~~
https://memora-sentences.itisnowornever271.workers.dev
~~~

別URLで撮る場合:

~~~bash
READON_URL=https://example.com npm run capture
~~~

## Render

~~~bash
npm run typecheck
npm run stills
npm run render
~~~

## Hook variants

デフォルト:

~~~
英語の長文、
興味ない話だとキツくない？
~~~

Remotionの入力propsを変えれば、例えば次にも差し替えられます。

- 好きなテーマなら、英語長文って読めそうじゃない？
- 英語講師が、欲しかった教材アプリを作ってみた

本編の実画面部分は共通なので、冒頭だけ変えるA/Bテストに向いています。
