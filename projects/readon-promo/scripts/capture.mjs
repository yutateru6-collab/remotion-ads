import fs from 'node:fs';
import path from 'node:path';
import {chromium} from 'playwright';

const APP_URL =
  process.env.READON_URL ||
  'https://memora-sentences.itisnowornever271.workers.dev';

const outDir = path.resolve('public/screens');
fs.mkdirSync(outDir, {recursive: true});
fs.mkdirSync(path.resolve('out'), {recursive: true});

const sampleMaterial = [
  '【解説担当】',
  '名前: みお',
  '役割: ギャル',
  '性格: お節介すぎるほど世話好き',
  '',
  'Most dinosaurs disappeared about 66 million years ago after a large asteroid struck Earth.',
  '約6600万年前、大きな小惑星が地球に衝突した後、多くの恐竜が姿を消しました。',
  '【解説】みお: ここは「過去の出来事」をシンプルな過去形で押さえればOK。about 66 million years ago が時間の目印だよ。',
  '',
  'However, some small feathered dinosaurs survived and eventually gave rise to modern birds.',
  'しかし、小型で羽毛を持つ恐竜の一部は生き残り、やがて現代の鳥類へとつながりました。',
  '【解説】みお: however で流れが反転するのがポイント。survived と gave rise to をセットで追うと意味がつながるよ。',
  '',
  'Scientists study fossils to understand why size, diet, and flexibility may have mattered.',
  '科学者たちは、体の大きさや食性、適応の柔軟さがなぜ重要だったのかを理解するために化石を研究しています。',
  '【解説】みお: to understand は「理解するために」という目的。文の骨格を先に取ると読みやすいよ。',
].join('\n');

const report = {
  url: APP_URL,
  viewport: {width: 393, height: 852},
  deviceScaleFactor: 3,
  consoleErrors: [],
  pageErrors: [],
  captures: [],
};

const browser = await chromium.launch({headless: true});
const context = await browser.newContext({
  viewport: {width: 393, height: 852},
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  locale: 'ja-JP',
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
});
const page = await context.newPage();
page.setDefaultTimeout(30000);

page.on('console', (message) => {
  if (message.type() === 'error') report.consoleErrors.push(message.text());
});
page.on('pageerror', (error) => {
  report.pageErrors.push(String(error?.stack || error));
});

const capture = async (name) => {
  const target = path.join(outDir, name);
  await page.screenshot({path: target, fullPage: false});
  const metrics = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    horizontalOverflow:
      document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  report.captures.push({name, ...metrics});
};

try {
  await page.goto(APP_URL, {waitUntil: 'domcontentloaded', timeout: 120000});
  await page.getByTestId('create-home').waitFor();
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await capture('01-home.png');

  await page.getByTestId('create-topic').fill('恐竜の絶滅と生き残り');
  await page.getByTestId('create-level').selectOption('日本の「英検2級」レベル');
  await page.getByTestId('create-length').selectOption('400');
  await page.getByTestId('create-role').selectOption('ギャル');
  await page
    .getByTestId('create-trait')
    .selectOption('お節介すぎるほど世話好き');
  await page.getByTestId('create-topic').scrollIntoViewIfNeeded();
  await page.waitForTimeout(450);
  await capture('02-create-filled.png');

  await page.getByTestId('create-import').click();
  const textarea = page.getByPlaceholder(
    'AI Studioで作った教材データをここに貼り付けてください',
  );
  await textarea.waitFor();
  await textarea.fill(sampleMaterial);
  await textarea.blur();
  await page.getByText('教材データを認識しました').waitFor();
  await page.locator('#add-material-name').fill('Dinosaur Survivors');
  await page.getByRole('button', {name: '教材として取り込む'}).click();

  const mobileActions = page.locator('.memora-reader-header__mobile-actions');
  await mobileActions.waitFor();
  await page.waitForTimeout(700);

  const translate = mobileActions.locator('button[title="日本語訳を表示"]');
  const explain = mobileActions.locator('button[title="解説を表示"]');

  if ((await translate.getAttribute('aria-pressed')) === 'true') {
    await translate.click();
  }
  if ((await explain.getAttribute('aria-pressed')) === 'true') {
    await explain.click();
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(350);
  await capture('03-reader-english.png');

  await translate.click();
  await page.waitForTimeout(350);
  await capture('04-reader-translation.png');

  await explain.click();
  await page.waitForTimeout(350);
  await capture('05-reader-explanation.png');
} finally {
  fs.writeFileSync(
    path.resolve('out/capture-report.json'),
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}

if (report.pageErrors.length > 0) {
  throw new Error('Page errors detected: ' + report.pageErrors.join(' | '));
}
