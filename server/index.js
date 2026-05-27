const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock Database of Clothing Items
const catalog = [
  {
    id: 'shirt-1',
    name: 'Classic White Tee',
    type: 'top',
    imageUrl: '/assets/clothes/white-tee.png',
    price: 29.99
  },
  {
    id: 'shirt-2',
    name: 'Blue Denim Jacket',
    type: 'top',
    imageUrl: '/assets/clothes/denim-jacket.png',
    price: 89.99
  },
  {
    id: 'shirt-3',
    name: 'Red Sweater',
    type: 'top',
    imageUrl: '/assets/clothes/red-sweater.png',
    price: 59.99
  }
];

// 1. Get available catalog
app.get('/api/catalog', (req, res) => {
  res.json(catalog);
});

// 2. Mock AI Processing Pipeline
// In a real app, this would send an image to a GPU instance for deep learning segmentation & 3D rendering
app.post('/api/process-frame', (req, res) => {
  const { frameData, itemId } = req.body;

  if (!frameData || !itemId) {
    return res.status(400).json({ error: 'Missing frame data or item ID' });
  }

  // Simulate network delay and AI processing time (50ms)
  setTimeout(() => {
    // Return mock coordinates/data for the clothing overlay
    res.json({
      status: 'success',
      segmentationMask: null, // Would contain pixel mask of the person
      itemData: catalog.find(c => c.id === itemId),
      message: 'Frame processed successfully'
    });
  }, 50);
});

app.listen(PORT, () => {
  console.log(`Virtual Try-On Backend API running on port ${PORT}`);
});
