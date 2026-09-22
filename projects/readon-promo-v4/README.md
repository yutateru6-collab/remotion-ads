# READON Promo V4

V3完成MP4を客観評価し、弱点を潰した短尺版。

## V4の狙い

- 22.06秒 → 16.5秒
- 日本語の単語途中改行をゼロにする
- 設定3枚重ねを廃止
- Readerは端末全体ではなく、英文・訳・解説のカードを局所ズーム
- モンタージュを廃止し、1画面1メッセージ
- 偽ボタン風CTAを廃止
- 音量を上げ、最終MP4を -16 LUFS / TP -1.5dB へ正規化
- Zen Kaku Gothic New / BIZ UDPGothicは自己ホスト継続

## 構成

1. 0-2s: Pain + READON
2. 2-4s: 好きなテーマ
3. 4-6s: レベル / 400語 / 解説キャラを順に1つずつ
4. 6-8s: 英文
5. 8-10s: 訳
6. 10-12s: 解説
7. 12-14s: 好きが読む理由になる
8. 14-16.5s: READON

## QA

- production UI capture
- Japanese font packages
- TypeScript
- 8 representative stills
- raw MP4
- FFmpeg loudnorm
- ffprobe
- ebur128 loudness report
- artifact upload
- 最後に実MP4とコンタクトシートを目視する
