import { Request, Response, NextFunction } from 'express';

// Performance monitoring middleware
export const performanceMonitor = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, url } = req;
    const { statusCode } = res;
    
    // Log slow requests (> 1 second)
    if (duration > 1000) {
      console.warn(`🐌 Slow request: ${method} ${url} - ${statusCode} - ${duration}ms`);
    }
    
    // Log performance metrics
    console.log(`📊 ${method} ${url} - ${statusCode} - ${duration}ms`);
  });
  
  next();
};

// Memory usage monitoring
export const logMemoryUsage = () => {
  const used = process.memoryUsage();
  const formatBytes = (bytes: number) => {
    return Math.round(bytes / 1024 / 1024 * 100) / 100 + ' MB';
  };
  
  console.log('💾 Memory Usage:', {
    rss: formatBytes(used.rss),
    heapTotal: formatBytes(used.heapTotal),
    heapUsed: formatBytes(used.heapUsed),
    external: formatBytes(used.external),
    arrayBuffers: formatBytes(used.arrayBuffers)
  });
};

// Database query performance monitoring
export const logQueryPerformance = (operation: string, duration: number) => {
  if (duration > 100) {
    console.warn(`🐌 Slow database query: ${operation} - ${duration}ms`);
  } else {
    console.log(`📊 Database query: ${operation} - ${duration}ms`);
  }
};
