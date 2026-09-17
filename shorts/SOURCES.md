# 出典・参照先・採用しない指示

確認日：2026-09-18。これは参照先を選ぶための記録であり、作者の運用成果や各スキルの全コードを動作検証した証明ではありません。

## このフォークに入っているもの

元リポジトリ：<https://github.com/Maartenlouis/remotion-ads>

作業開始時のコミット：`8c779461b99a36f02bbc2d8e3ec1d6a6f2689d26`。

元の `README.md` と `SKILL.md` の本文・`references/`・`scripts/`・[LICENSE](../LICENSE)を保持し、日本語の入口と運用ルールを追加しています。元のライセンスはMIT、著作権表示は `Copyright (c) 2025 Maarten van Onoesen` です。

以下の他リポジトリは、今回フォークも自動インストールも一括コピーもしていません。必要なときに原典を読むリンク参照です。このフォークの日本語ガイドは独自の運用上の判断を含み、原典の全文翻訳ではありません。

## 用途別の参照表

| 資料 | 読む場所 | 採用する部分 | このフォークでは採用しない部分 |
|---|---|---|---|
| remotion-ads | [文字演出](../references/ohneis-style.md)、[台本](../references/ad-copywriting.md)、[動き](../references/animations.md) | 文字の階層、強調、画面設計、紹介動画の構成 | 非広告への購入誘導、音声なし動画への音声基準、英文向け書体や小文字ルールの機械適用 |
| remotion-video-director | [SKILL.md](https://github.com/BayramAnnakov/remotion-video-director/blob/main/SKILL.md) | 新しい企画の目的・構成・レビュー整理 | 既に分かっていることの再質問、AI役割分担を人間の専門家審査と呼ぶこと、毎回の大掛かりな企画会議 |
| tiktok-video-skills | [short-form-video](https://github.com/iart-ai/tiktok-video-skills/blob/main/skills/short-form-video/SKILL.md)、[retention-pacing](https://github.com/iart-ai/tiktok-video-skills/blob/main/skills/short-form-video/references/retention-pacing.md) | 冒頭・展開・着地の点検、実際の台本で静止画を書き出して確認する手順 | 根拠を確認できない再生維持率の数値、全動画への強制ループ、笑いや思考のための間まで消す指示 |
| tiktok-video-skills | [countdown-video](https://github.com/iart-ai/tiktok-video-skills/blob/main/skills/countdown-video/SKILL.md) | クイズの考える時間の表示 | 全ての英語解説へのカウントダウン追加 |
| text-message-video-skills | [text-message-animation](https://github.com/iart-ai/text-message-video-skills/blob/main/skills/text-message-animation/SKILL.md)、[bubble-recipes](https://github.com/iart-ai/text-message-video-skills/blob/main/skills/text-message-animation/references/bubble-recipes.md) | １通ずつの表示、返信待ち、話者、スクロールの設計 | 本物のチャット履歴のように誤認させる演出、LINE専用完成品という説明 |
| kinetic-typography-skills | [kinetic-typography](https://github.com/iart-ai/kinetic-typography-skills/blob/main/skills/kinetic-typography/SKILL.md)、[reveal-recipes](https://github.com/iart-ai/kinetic-typography-skills/blob/main/skills/kinetic-typography/references/reveal-recipes.md) | 行・語の出し分け、強調、Remotionで再現する文字演出 | 動画へのCSSタイマーやWeb用実装の丸写し、長文全文の文字別アニメーション |
| remotion-motion-graphics-skill | [README](https://github.com/Liamrjohnston/remotion-motion-graphics-skill)、[motion-graphics/SKILL.md](https://github.com/Liamrjohnston/remotion-motion-graphics-skill/blob/main/skills/motion-graphics/SKILL.md) | 実在アプリの画面の忠実性、画面検品の考え方 | 文字主体の動画への「文章を表示しない」方針の適用、架空ゲームUIへの実製品再現ルールの適用 |
| Remotion公式 | [Animating properties](https://www.remotion.dev/docs/animating-properties)、利用環境に導入されている公式スキル | フレームに基づくアニメーションなど実装API | 作品の面白さや英語の正しさを保証する資料としての利用 |

## 矛盾したときの扱い

「瞬時に切り替える」と「滑らかにつなぐ」、「文字を主役にする」と「音声と同じ文章を表示しない」、「間を削る」と「考える時間を取る」は同時に強制しません。

ユーザーの明示指定 → このフォークの選択モード → 共通検品 → 必要箇所だけを選んだ参考資料、の順で制作方針を整理します。実装APIの正しさは公式資料と実行環境で確認します。上位のシステム指示・権限・安全上の制約は当然に優先します。

## 外部資料を取り込む際の手順

原典を実際に開き、使う節と使わない節を制作メモに残します。取得できなければ、このフォークのローカルルールで制作し、外部スキルを読んだ・導入した・使ったと偽らないこと。

将来、他リポジトリのコードや文章を同梱する場合は、その時点の `LICENSE` 本文、著作権表示、対象コミット、コピー対象ファイルを確認し、必要な表示を同梱します。リンクの存在だけで転載条件の確認済みとは扱いません。インストールスクリプトや有料APIの利用は自動では行いません。

料金・無料枠・プラットフォーム仕様・ライブラリAPIには古い情報が混ざりえます。原典の文章を現在の事実として無条件で引き継がず、必要な項目をその都度検証します。
