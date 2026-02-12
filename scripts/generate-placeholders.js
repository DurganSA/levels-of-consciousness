const fs = require('fs');
const path = require('path');

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

// Abstract art color palettes (from the flyer - hot pink, teal, yellow, navy, bronze)
const colorPalettes = [
  ['#FF1493', '#20B2AA', '#FFD700'], // Hot pink, teal, gold
  ['#4B0082', '#FF6347', '#32CD32'], // Indigo, tomato, lime
  ['#FF69B4', '#8A2BE2', '#00CED1'], // Hot pink, blue violet, dark turquoise
  ['#FF4500', '#1E90FF', '#FFD700'], // Orange red, dodger blue, gold
  ['#9370DB', '#3CB371', '#FF8C00'], // Medium purple, medium sea green, dark orange
  ['#DC143C', '#00FA9A', '#4169E1'], // Crimson, medium spring green, royal blue
  ['#FF1493', '#7B68EE', '#00FFFF'], // Deep pink, medium slate blue, cyan
  ['#FF6347', '#48D1CC', '#BA55D3'], // Tomato, medium turquoise, medium orchid
  ['#FF69B4', '#32CD32', '#4169E1'], // Hot pink, lime green, royal blue
  ['#DA70D6', '#20B2AA', '#FFD700'], // Orchid, light sea green, gold
  ['#FF4500', '#6A5ACD', '#00CED1'], // Orange red, slate blue, dark turquoise
  ['#FF1493', '#3CB371', '#FF8C00'], // Deep pink, medium sea green, dark orange
  ['#8A2BE2', '#FF6347', '#FFD700'], // Blue violet, tomato, gold
  ['#FF69B4', '#00FA9A', '#4B0082'], // Hot pink, medium spring green, indigo
  ['#DC143C', '#48D1CC', '#9370DB'], // Crimson, medium turquoise, medium purple
  ['#FF4500', '#7B68EE', '#32CD32'], // Orange red, medium slate blue, lime green
  ['#FF1493', '#4169E1', '#FFD700'], // Deep pink, royal blue, gold
];

function generateAbstractSVG(letter, index) {
  const colors = colorPalettes[index];
  const width = 600;
  const height = 800;
  
  // Generate random abstract shapes
  const shapes = [];
  const numShapes = 5 + Math.floor(Math.random() * 5);
  
  for (let i = 0; i < numShapes; i++) {
    const color = colors[i % colors.length];
    const opacity = 0.6 + Math.random() * 0.4;
    const shapeType = Math.floor(Math.random() * 3);
    
    if (shapeType === 0) {
      // Circle
      const cx = Math.random() * width;
      const cy = Math.random() * height;
      const r = 50 + Math.random() * 200;
      shapes.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}"/>`);
    } else if (shapeType === 1) {
      // Rectangle
      const x = Math.random() * width;
      const y = Math.random() * height;
      const w = 100 + Math.random() * 300;
      const h = 100 + Math.random() * 300;
      const rotation = Math.random() * 360;
      shapes.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${x + w/2} ${y + h/2})"/>`);
    } else {
      // Ellipse
      const cx = Math.random() * width;
      const cy = Math.random() * height;
      const rx = 50 + Math.random() * 200;
      const ry = 50 + Math.random() * 200;
      const rotation = Math.random() * 360;
      shapes.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${color}" opacity="${opacity}" transform="rotate(${rotation} ${cx} ${cy})"/>`);
    }
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#F5F3EE"/>
  ${shapes.join('\n  ')}
  <text x="${width/2}" y="${height - 50}" font-size="120" font-weight="bold" fill="#2D3E50" opacity="0.1" text-anchor="middle" font-family="sans-serif">${letter}</text>
</svg>`;
}

// Create scripts directory if it doesn't exist
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Generate SVG files
const publicDir = path.join(__dirname, '..', 'public', 'paintings');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

letters.forEach((letter, index) => {
  const svg = generateAbstractSVG(letter, index);
  const filePath = path.join(publicDir, `${letter}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`Generated ${letter}.svg`);
});

console.log('\nAll placeholder images generated successfully!');
console.log(`Location: ${publicDir}`);
