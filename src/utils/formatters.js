export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const calculateSavings = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round((originalPrice - price) * 100) / 100;
};

export const getDiscountBadge = (price, originalPrice, discountPercentage) => {
  if (discountPercentage && discountPercentage > 0) {
    return `${discountPercentage}% OFF`;
  }
  if (originalPrice && originalPrice > price) {
    const calc = Math.round(((originalPrice - price) / originalPrice) * 100);
    return `${calc}% OFF`;
  }
  return null;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};
