import express from "express";

// Performance monitoring middleware
export const performanceMonitor = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`⚡ ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

// Memory usage logging
export const logMemoryUsage = () => {
  const used = process.memoryUsage();
  console.log("📊 Memory Usage:");
  console.log(`   RSS: ${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`);
  console.log(`   Heap Total: ${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`);
  console.log(`   Heap Used: ${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`);
  console.log(`   External: ${Math.round(used.external / 1024 / 1024 * 100) / 100} MB`);
};
