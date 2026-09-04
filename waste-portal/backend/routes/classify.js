const express = require('express');
const router = express.Router();

// Mock "AI" keyword-based waste classifier.
// In a real system this would call a trained model / LLM.
const CLASSIFICATION_RULES = [
  {
    category: 'Recyclable',
    keywords: ['glass', 'bottle', 'plastic', 'pet', 'can', 'tin', 'cardboard', 'carton', 'paper', 'newspaper', 'metal', 'aluminium', 'aluminum'],
    tip: 'Rinse it out and keep it dry before placing it in the recyclable bin.',
    color: 'blue',
  },
  {
    category: 'Organic',
    keywords: ['peel', 'food', 'leftover', 'fruit', 'vegetable', 'veg', 'rice', 'leaf', 'leaves', 'garden', 'coconut', 'husk', 'tea leaves', 'eggshell'],
    tip: 'Organic waste can be composted or set out on your council\'s organic collection day.',
    color: 'green',
  },
  {
    category: 'E-Waste/Hazardous',
    keywords: ['bulb', 'battery', 'batteries', 'phone', 'charger', 'electronic', 'laptop', 'wire', 'paint', 'chemical', 'pesticide', 'medicine', 'syringe'],
    tip: 'Never mix this with household waste — drop it at a designated e-waste / hazardous collection point.',
    color: 'red',
  },
  {
    category: 'General/Non-Recyclable',
    keywords: ['diaper', 'nappy', 'sanitary', 'styrofoam', 'polythene', 'ceramic', 'ash', 'cigarette'],
    tip: 'This goes out with general waste on your regular collection day.',
    color: 'gray',
  },
];

function classifyItem(item) {
  const text = item.toLowerCase();
  for (const rule of CLASSIFICATION_RULES) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      return {
        category: rule.category,
        tip: rule.tip,
        color: rule.color,
        matched: true,
      };
    }
  }
  return {
    category: 'Unclassified',
    tip: "We couldn't confidently classify that item. When in doubt, contact your local council office.",
    color: 'gray',
    matched: false,
  };
}

// POST /api/classify
router.post('/', (req, res) => {
  const { item } = req.body;

  if (!item || typeof item !== 'string' || !item.trim()) {
    return res.status(400).json({ success: false, error: 'Please provide an item to classify.' });
  }

  const result = classifyItem(item.trim());
  res.json({ success: true, item: item.trim(), ...result });
});

module.exports = router;
