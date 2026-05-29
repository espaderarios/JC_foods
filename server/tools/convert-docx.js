const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

async function run() {
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: node convert-docx.js <path-to-docx>');
    process.exit(1);
  }

  const absInput = path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);
  if (!fs.existsSync(absInput)) {
    console.error('File not found:', absInput);
    process.exit(2);
  }

  try {
    const htmlResult = await mammoth.convertToHtml({ path: absInput });
    const html = htmlResult.value;
    const docsDir = path.join(__dirname, '..', '..', 'docs');
    if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

    const outHtml = path.join(docsDir, 'plan.html');
    fs.writeFileSync(outHtml, html, 'utf8');

    const textResult = await mammoth.extractRawText({ path: absInput });
    const outTxt = path.join(docsDir, 'plan.txt');
    fs.writeFileSync(outTxt, textResult.value, 'utf8');

    // Simple task extraction: collect headings from HTML
    const headings = [];
    const hRegex = /<h[1-3][^>]*>(.*?)<\/h[1-3]>/gi;
    let m;
    while ((m = hRegex.exec(html))) {
      const plain = m[1].replace(/<[^>]+>/g, '').trim();
      if (plain) headings.push(plain);
    }

    const tasks = headings.map((h, i) => ({ id: i+1, title: h, status: 'not-started' }));
    const outTasks = path.join(docsDir, 'plan_tasks.json');
    fs.writeFileSync(outTasks, JSON.stringify(tasks, null, 2), 'utf8');

    console.log('Conversion complete. Outputs:');
    console.log(' -', outHtml);
    console.log(' -', outTxt);
    console.log(' -', outTasks);
  } catch (err) {
    console.error('Conversion error:', err);
    process.exit(3);
  }
}

run();
