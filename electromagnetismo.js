const canvas = document.getElementById("electromagnetismCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// Variables para el campo magnético
const fieldLines = [];
const numLines = 12;
const radius = 100;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

for (let i = 0; i < numLines; i++) {
    let angle = (i / numLines) * Math.PI * 2;
    fieldLines.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        angle: angle,
    });
}

// Función de animación
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fondo del canvas
    ctx.fillStyle = "#f0f8ff"; // Azul claro
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar el conductor (cable con corriente)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#ff4500"; // Naranja
    ctx.fill();
    ctx.closePath();
    
    // Dibujar las líneas de campo magnético
    fieldLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(line.x, line.y);
        ctx.strokeStyle = "#1e90ff"; // Azul vivo
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        
        // Animar líneas rotando alrededor del conductor
        line.angle += 0.02;
        line.x = centerX + Math.cos(line.angle) * radius;
        line.y = centerY + Math.sin(line.angle) * radius;
    });
    
    requestAnimationFrame(draw);
}

draw();
