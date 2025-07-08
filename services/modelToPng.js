import{ createCanvas } from 'canvas';

export function modelToPng(model) {

    const canvas = createCanvas(model.width, model.height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = model.backgroundColor || '#fff';
    ctx.fillRect(0, 0, model.width, model.height);

    // Рисуем дороги
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
