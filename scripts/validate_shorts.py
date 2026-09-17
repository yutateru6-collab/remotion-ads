#!/usr/bin/env python3
"""Check local guide integrity, not video quality. Python 3.9+, standard library only."""
from __future__ import annotations

import argparse
import hashlib
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
MODES = {"text-tsukkomi", "chat-story", "game-ui", "english-learning", "app-promo"}
README_MARKER = "<!-- upstream-readme:start -->\n"
SKILL_START = "<!-- japanese-short-router:start -->\n"
SKILL_END = "<!-- japanese-short-router:end -->\n"
# Original Git blob IDs at commit 8c779461b99a36f02bbc2d8e3ec1d6a6f2689d26.
# Update deliberately only after reviewing an upstream update.
BASELINE = {
    ".gitignore": "ca0221a913e5b7998771ed5c8ae0447da8e0f714",
    "LICENSE": "e8af66b03aa2045f15b41444311017199ebf6ccd",
    "README.md": "de678be7afbd0d91e95fe1c9eb6a7cbb0d976336",
    "SKILL.md": "8b7dfe1613d1772529357d26256c22e4c4fafcdc",
    "package.json": "23e2b6e73fc991ea2c7481c7edbfadbfa570f658",
    "package-lock.json": "be31fd34e8992bf2f8ff4e245d80187877a3d8c7",
    "assets/dictionaries/example.pls": "c2591b0b970745ba7e68a7f4e34786536a1b7aad",
    "assets/dictionaries/template.pls": "a2ed643a95392b3536961575dd60f74e974ba02d",
    "references/ad-copywriting.md": "d513fa861d1912662bab7791cdbb5651eee244fb",
    "references/animations.md": "b051f85098f905bbcfa1677896b74fa4e3b348d5",
    "references/brand-config-template.md": "77e8359f2c2dd9b21f235d36b6aed3dc7cb02501",
    "references/captions.md": "dd214674cd207837769679dd0396adc375a2c9bf",
    "references/carousels.md": "3998b70559a0fb3010ea4bef835637f391d4cc60",
    "references/components.md": "22d097194e66c8bb3d72c6e75fb0e5a906cf216c",
    "references/copy-frameworks.md": "47961b831330ae710f15c297d635c3af2594d9a0",
    "references/formats.md": "327c5313ff58b9979de9b2cc55b8036b4dc74cf2",
    "references/gemini-tts.md": "d0099cb874fd6f233b798ac02f4a05a14add56f4",
    "references/html-in-canvas.md": "5de8205af6058a6b14eacdcd50b856ca6ecb2f4c",
    "references/local-assets.md": "d52f1ad52adbde9aeb250caa4d05a38560782ea8",
    "references/music.md": "8126ebff7f3e1e56a16239fb1065be463a39da16",
    "references/natural-transitions.md": "f41671bad063939124611c21e1b05f5174449c7f",
    "references/ohneis-style.md": "f5cf6dfd40ee8ee0d69b4e14d0e823db482ac6cd",
    "references/paid-ads.md": "25ba20064edb703b861b6e7a87313b32665d1f8e",
    "references/setup.md": "2899f09e5a69873a775a5b5295f75ed5a2a31514",
    "references/social-content.md": "1c9889b02ebe0dc185f002c4a2fd2999be1dac27",
    "references/sound-effects.md": "743f98e7009e2deddc8fa57d5e26765a7a93aaf8",
    "references/url-to-video.md": "d62eec9bdd4c42356332e40ea8fae637c9d8ed85",
    "references/voiceover.md": "52fff1d7b6af4b3989a114e865b2548e239fd257",
    "references/website-videos.md": "78086aa304e1a95fada2bc7b2b03090bece15307",
    "scripts/gemini-tts.mjs": "400013c5beb8bdfabffa8521d785940cf0a28c31",
    "scripts/generate.js": "1a83b7b2c39a616a607fd4c934a79737d02c8f45",
    "scripts/suno-direct.ts": "706ec546608a57d1cad94ccdd54cdc80920fdeae",
    "scripts/url-to-scenes.js": "75d5572bfb92496ba52664e1e3482330f232dbb8",
}
GUIDES = ["AGENTS.md", "SHORTS_GUIDE_JA.md", "shorts/MODES.md", "shorts/QUALITY.md",
          "shorts/SOURCES.md", "shorts/TEMPLATE.md", "shorts/examples/appeal-husband.md"]


def blob_id(data: bytes) -> str:
    return hashlib.sha1(b"blob " + str(len(data)).encode("ascii") + b"\0" + data).hexdigest()


def original_bytes(name: str, data: bytes) -> bytes:
    if name == "README.md":
        marker = README_MARKER.encode()
        if data.count(marker) != 1:
            raise ValueError("README must contain exactly one upstream boundary")
        return data.split(marker, 1)[1]
    if name == "SKILL.md":
        start, end = SKILL_START.encode(), SKILL_END.encode()
        if data.count(start) != 1 or data.count(end) != 1:
            raise ValueError("SKILL must contain exactly one router block")
        left, tail = data.split(start, 1)
        if end not in tail:
            raise ValueError("Router block markers are out of order")
        return left + tail.split(end, 1)[1]
    return data


def link_errors(path: Path, text: str, root: Path) -> list[str]:
    errors: list[str] = []
    # Only inline local links and explicit HTML fragment IDs used by these guides.
    prose = re.sub(r"```.*?```", "", text, flags=re.S)
    for raw in re.findall(r"\[[^\]]*\]\(([^\s)]+)\)", prose):
        parsed = urlsplit(raw)
        if parsed.scheme or parsed.netloc:
            continue  # External availability and contents are not checked here.
        target = (path.parent / unquote(parsed.path)).resolve() if parsed.path else path
        if not target.is_relative_to(root):
            errors.append(f"{path.name}: link escapes repository: {raw}")
        elif not target.exists():
            errors.append(f"{path.name}: missing local target: {raw}")
        elif parsed.fragment and target.is_file():
            ids = re.findall(r'<a\s+id="([^"]+)"', target.read_text(encoding="utf-8"))
            if unquote(parsed.fragment) not in ids:
                errors.append(f"{path.name}: missing explicit anchor: {raw}")
    return errors


def validate(root: Path) -> list[str]:
    errors: list[str] = []
    for name, expected in BASELINE.items():
        try:
            actual = blob_id(original_bytes(name, (root / name).read_bytes()))
            if actual != expected:
                errors.append(f"Original content changed: {name} ({actual})")
        except (OSError, ValueError) as exc:
            errors.append(f"{name}: {exc}")
    contents: dict[str, str] = {}
    for name in ["README.md", "SKILL.md", *GUIDES]:
        try:
            text = (root / name).read_text(encoding="utf-8")
            if not text.strip():
                errors.append(f"Empty guide: {name}")
            contents[name] = text
            errors.extend(link_errors(root / name, text, root))
        except (OSError, UnicodeError) as exc:
            errors.append(f"{name}: {exc}")
    modes_text = contents.get("shorts/MODES.md", "")
    ids = re.findall(r'<a id="([^"]+)"></a>', modes_text)
    if len(ids) != 5 or set(ids) != MODES:
        errors.append("MODES.md must define the five unique mode anchors")
    for name in ["AGENTS.md", "SKILL.md", "SHORTS_GUIDE_JA.md"]:
        for mode in sorted(MODES):
            if mode not in contents.get(name, ""):
                errors.append(f"{name}: missing route {mode}")
    for section in re.split(r'<a id="[^"]+"></a>', modes_text)[1:]:
        for requirement in ["選ぶとき", "読む資料", "組み立て", "使わない", "検品", "依頼例"]:
            if requirement not in section:
                errors.append(f"Mode section is missing: {requirement}")
    return errors


def self_test() -> None:
    import tempfile
    original = b"---\nname: example\n---\n\n# Original\n"
    insertion = (SKILL_START + "Router\n" + SKILL_END).encode()
    modified = original.replace(b"\n# Original", insertion + b"\n# Original")
    assert original_bytes("SKILL.md", modified) == original
    assert original_bytes("README.md", b"Intro\n" + README_MARKER.encode() + original) == original
    assert blob_id(b"") == "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391"
    for name in ["README.md", "SKILL.md"]:
        try:
            original_bytes(name, b"Missing marker")
        except ValueError:
            pass
        else:
            raise AssertionError(f"Missing marker was not rejected: {name}")
    with tempfile.TemporaryDirectory() as folder:
        root = Path(folder).resolve()
        target = root / "modes.md"
        target.write_text('<a id="good"></a>\n', encoding="utf-8")
        page = root / "guide.md"
        assert not link_errors(page, "[ok](modes.md#good)", root)
        assert link_errors(page, "[bad](modes.md#missing)", root)
        assert link_errors(page, "[bad](missing.md)", root)
        assert link_errors(page, "[bad](../outside.md)", root)
        assert not link_errors(page, "[external](https://example.com)", root)
        assert not link_errors(page, "```\n[x](missing.md)\n```", root)
    print("PASS: validator self-tests")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--self-test", action="store_true", help="Test the checker without repository files")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return 0
    errors = validate(ROOT)
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(f"PASS: {len(BASELINE)} original files preserved; five mode routes and local guide links checked")
    print("NOT CHECKED: external URLs, video rendering, readability, English correctness or MP4 quality")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
