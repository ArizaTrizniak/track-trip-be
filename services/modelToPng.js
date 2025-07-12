import{ createCanvas, loadImage } from 'canvas';
import path from 'path';
import fs from 'fs';

function fillBackground(ctx, model) {
    ctx.fillStyle = model.backgroundColor || '#fff';
    ctx.fillRect(0, 0, model.width, model.height);
}

export async function modelToPng(model) {

    const canvas = createCanvas(model.width, model.height);
    const ctx = canvas.getContext('2d');

    let bgDrawn = false;

    if (model.backgroundId) {
        const imagePath = path.resolve('public', 'backgrounds', model.backgroundId);
        if (fs.existsSync(imagePath)) {
            try {
                const bgImage = await loadImage(imagePath);

                const iw = bgImage.width;
                const ih = bgImage.height;
                const cw = model.width;
                const ch = model.height;
                const ir = iw / ih;
                const cr = cw / ch;
                let sx = 0, sy = 0, sw = iw, sh = ih;

                if (ir > cr) {
                    sw = ih * cr;
                    sx = (iw - sw) / 2;
                } else {
                    sh = iw / cr;
                    sy = (ih - sh) / 2;
                }
                ctx.drawImage(bgImage, sx, sy, sw, sh, 0, 0, cw, ch);
                bgDrawn = true;
            } catch (err) {
                console.error(`[modelToPng] Не удалось загрузить фон "${model.backgroundId}":`, err);
            }
        } else {
            console.warn(`[modelToPng] Фоновый файл не найден: ${imagePath}`);
        }
    }

    if (!bgDrawn) {
        fillBackground(ctx, model);
    }

    for (const road of model.roads) {
        const start = model.points.find(p => p.id === road.startId);
        const end = model.points.find(p => p.id === road.endId);
        if (!start || !end) continue;
        ctx.strokeStyle = road.color || '#333';
        ctx.lineWidth = road.lineWidth || 2;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }


    for (const point of model.points) {
        ctx.fillStyle = point.color || '#1976d2';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
        ctx.fill();

        if (point.label) {
            ctx.fillStyle = '#000';
            ctx.font = '16px Arial';
            ctx.fillText(point.label, point.x + 14, point.y - 10);
        }
    }

    const buffer = canvas.toBuffer('image/png');
    return buffer;
}
