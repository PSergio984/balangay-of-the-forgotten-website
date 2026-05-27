import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

async function extractTextFromDocx(filePath: string): Promise<string> {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
}

const PUBLIC_PATH = 'public';
const loreDoc = path.join(PUBLIC_PATH, 'Game-Lore.docx');
const masterScriptDoc = path.join(PUBLIC_PATH, 'GAME-MASTER-SCRIPT-v0.2.docx');
const rulesDoc = path.join(PUBLIC_PATH, 'Game-Flow-and-Rules.docx');

async function main() {
    const lore = await extractTextFromDocx(loreDoc);
    const script = await extractTextFromDocx(masterScriptDoc);
    const rules = await extractTextFromDocx(rulesDoc);
    
    fs.writeFileSync('public/extracted-content.json', JSON.stringify({ lore, script, rules }, null, 2));
    console.log('Extracted content to public/extracted-content.json');
}

main().catch(console.error);
