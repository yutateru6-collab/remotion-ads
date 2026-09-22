# READON Promo V3

V2の再検証から作り直した、日本語向け22秒縦型プロモ。

## 主な変更

- 日本語見出し: Zen Kaku Gothic New 900
- 補助字幕/UI: BIZ UDPGothic 700
- OSフォントfallback依存を廃止し、Fontsource 5.3.0で自己ホスト
- 30秒 → 22秒へ圧縮
- 冒頭2.5秒以内にREADON名と課題を同時提示
- 重要文字を右側UI・下部UIから離すセーフゾーン設計
- 見出し約82〜106px、補助文約50〜52px
- 小さい英語ラベルを削減
- Reader / 訳 / 解説の下部説明を大きくし、実UIと分離
- CTAは長いURLではなく「READONを開く」を主役に変更
- AIナレーションを短く再生成
- BGMを下げ、ナレーションを前に出す

## Render

npm install
npx playwright install --with-deps chromium
npm run capture
npm run fetch:voice
npm run generate:sfx
npm run typecheck
npm run stills
npm run render

## QA

- 本番READONをiPhone相当で実操作
- 9代表フレーム
- 22秒MP4
- ffprobeで解像度・fps・尺・codec
- 完成後にコンタクトシートを作り、文字・セーフゾーン・改行・画面重なりを目視
