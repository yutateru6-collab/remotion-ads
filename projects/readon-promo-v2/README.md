# READON Promo V2

READONの実画面を軸に、ショット設計・2.5D風カメラ・モーショングラフィックス・AIナレーション・自作BGM/SFXを組み合わせた縦型プロモです。

Output
- 1080 × 1920
- 30 fps
- 30 seconds
- H.264
- TikTok / Reels / Shorts向け

Creative direction
Pain → transformation → control → reading → assistance → emotional close

V1の「画面＋説明テロップ」中心から、V2では以下を追加しました。

1. 退屈な英文に押される冒頭モーショングラフィックス
2. READONへのシネマティックなhero reveal
3. テーマ入力を主役にしたショット
4. レベル・長さ・解説キャラをカードデッキとして見せるショット
5. 設定が教材へまとまるmaterialize演出
6. Reader / 訳 / 解説を別ショットで見せる
7. 3画面モンタージュ
8. 余韻を取ったロゴ/CTAエンド
9. AIナレーション
10. 生成スクリプトによる権利クリアなBGM・whoosh・click・impact・riser

Source fidelity
アプリUIはCloudflare本番をPlaywrightでiPhone相当として操作して撮影します。架空のボタン、利用者数、実績、レビューなどは追加しません。

Commands
npm install
npx playwright install --with-deps chromium
npm run capture
npm run fetch:voice
npm run generate:sfx
npm run typecheck
npm run stills
npm run render

AI voice
ナレーションはAI Voice Generatorで4セグメントに分けて生成し、scripts/fetch-voice.mjs が公開プレビュー音源を public/audio/ に取得します。

Audio rights
BGM・効果音は scripts/generate-sfx.mjs が波形を生成します。第三者の音源素材は同梱しません。

QA
GitHub Actionsで production UI capture / TypeScript / 9 representative stills / MP4 / ffprobe / artifact upload まで実行します。
