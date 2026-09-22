# READON Promo V5

TikTok英語学習系の「先に1問学ばせる」構造へ全面変更した15秒版。

## 構成

- 0.0–1.5s: 「これ、2秒で意味わかる？」+ survived
- 1.5–3.0s: 3択クイズ + カウント
- 3.0–4.2s: 正解「生き残った」
- 4.2–6.0s: 「恐竜なら、続きが気になる」
- 6.0–8.0s: READONで好きなテーマ + 英検2級 / 400語 / ギャル解説
- 8.0–9.5s: 英文
- 9.5–11.0s: 訳
- 11.0–12.5s: 解説
- 12.5–15.0s: READON

## Audio sync

ナレーションを9ファイルに分割し、各ショットと1対1で対応させる。
scripts/check-audio-sync.mjs が ffprobe で実音声尺を計測し、
割り当てショットから3フレーム以上はみ出す場合はCIを失敗させる。

## QA

- 本番READON capture
- self-hosted Japanese fonts
- audio duration validation
- TypeScript
- 9 QA stills
- raw MP4
- -16 LUFS / TP -1.5dB loudness normalization
- ffprobe
- ebur128
- 1秒刻み contact sheet
- artifact upload
