---
name: remotion-ads
description: Professional video ad creation with Remotion — Instagram Reels (9:16), website explainers (16:9), and carousels (4:5). Use when creating video ads, animated social content, or educational explainer videos. Includes ElevenLabs voiceover with word-level captions, AI icon generation, background music, ad copywriting frameworks, and Meta campaign management. Also use when the user provides a URL and wants to create a video for that page.
---
<!-- japanese-short-router:start -->
## このフォークの入口：日本語ショート動画

**すべての視覚制作で、最初に [Universal Visual Design](universal-design/SKILL.md) を通す。** ここでアートディレクション、視覚階層、構図、タイポグラフィ、色、モーション、最終Visual QAを決め、その後に内容別の形式を選ぶ。

ショート動画・日本語の文字動画・会話劇・ゲーム風のネタ・英語教材・アプリ紹介を作る場合は、[AGENTS.md](AGENTS.md) と [SHORTS_GUIDE_JA.md](SHORTS_GUIDE_JA.md) を読み、[５つのモード](shorts/MODES.md)から主役を１つ選ぶ。

- `text-tsukkomi`：文章や人物図鑑を文字で面白く読ませる。
- `chat-story`：会話の返信と間で読ませる。
- `game-ui`：選択肢や判定画面自体をネタにする。
- `english-learning`：英語クイズ・文法解説。正確さと思考時間を優先する。
- `app-promo`：実在アプリの１操作と結果を紹介する。

この用途では、以下の元資料は必要な節だけを参照する。広告の購入誘導、全動画の音声必須化、固定尺、英語向けの文字設定を一律に強制しない。[共通検品](shorts/QUALITY.md)で日本語の読み時間、編集可能な文字レイヤー、実際の書き出しの確認を行う。

他の公開スキル集は[参照表](shorts/SOURCES.md)から必要な部分を読む方式で、今回一括導入していない。取得できないものを使ったと報告しない。下記の元資料と日本語の制作方針が異なる場合は、ユーザーの明示指定と選択モードを優先する。実装APIは公式資料と実行環境で検証する。

以下は保存した元のスキル本文。
<!-- japanese-short-router:end -->

# Remotion Ads

Create professional video ads and explainer videos with Remotion, ElevenLabs voiceover, and animated captions.

## Setup

1. Copy `references/brand-config-template.md` → `references/brand-config.md`
2. Fill in brand colors, fonts, voice, caption styling, and content rules
3. Create pronunciation dictionary from `assets/dictionaries/template.pls`

See [references/setup.md](references/setup.md) for dependencies and folder structure.

---

## Supported Formats

| Format | Aspect | Resolution | Duration | Scenes |
|--------|--------|-----------|----------|--------|
| Instagram Reels | 9:16 | 1080×1920 | 15-60s | 4 (Hook→Problem→Solution→CTA) |
| Instagram Reels (Ohneis) | 9:16 | 1080×1920 | 15-45s | Beat-driven (word-level) |
| Website Explainers | 16:9 | 1920×1080 | 60-160s | 6 (Hook→Problem→Context→Solution→Process→CTA) |
| Carousels | 4:5 | 1080×1350 | Static | 5-10 slides |

See [references/formats.md](references/formats.md) for safe zones and crop specs.
See [references/ohneis-style.md](references/ohneis-style.md) for beat-driven cinematic reel template.
See [references/website-videos.md](references/website-videos.md) for 16:9 long-form format.

---

## Workflow

### From scratch

```bash
# 1. Write scene JSON
# 2. Generate voiceover with word timestamps
node scripts/generate.js \
  --scenes scenes.json \
  --with-timestamps \
  --dictionary your-brand \
  --output-dir public/audio/ad-example/

# 3. Create Remotion composition using actualDuration from info.json
# 4. Render
npx remotion render AdExample out/ad-example.mp4 --codec=h264 --crf=18
```

### From a URL (page → video)

```bash
# 1. Extract page data into scene JSON
node scripts/url-to-scenes.js --url https://example.com/page --format reels --output scenes.json
# 2. Review/edit the generated scenes.json
# 3. Continue with voiceover + composition as above
```

See [references/url-to-video.md](references/url-to-video.md) for the full URL-to-video workflow.
