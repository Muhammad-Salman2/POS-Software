// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import Quagga from "@ericblade/quagga2";
// import { X, Camera, RotateCcw, Zap } from 'lucide-react';

// const BarcodeScanner = ({ onScan, onClose }) => {
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState({ message: '', type: '' });
//   const [isInitializing, setIsInitializing] = useState(false);
//   const [isScanning, setIsScanning] = useState(false);
//   const [lastScan, setLastScan] = useState(null);
//   const [scanCount, setScanCount] = useState(0);
  
//   const scannerRef = useRef(null);
//   const lastScanTime = useRef(0);
//   const isInitialized = useRef(false);
//   const scanDebounceTimeout = useRef(null);

//   // Cleanup function
//   const cleanup = useCallback(() => {
//     try {
//       if (isInitialized.current) {
//         Quagga.stop();
//         isInitialized.current = false;
//       }
//       if (scanDebounceTimeout.current) {
//         clearTimeout(scanDebounceTimeout.current);
//         scanDebounceTimeout.current = null;
//       }
//     } catch (error) {
//       console.warn('Cleanup warning:', error);
//     }
//   }, []);

//   // Initialize scanner with better error handling
//   const initializeScanner = useCallback(async () => {
//     if (isInitializing || isInitialized.current) {
//       return;
//     }

//     setIsInitializing(true);
//     setError(null);
//     setStatus({ message: 'Initializing camera...', type: 'info' });

//     try {
//       // Ensure clean state
//       cleanup();
      
//       await Quagga.init({
//         inputStream: {
//           name: "Live",
//           type: "LiveStream",
//           target: scannerRef.current,
//           constraints: {
//             facingMode: "environment",
//             width: { min: 640, ideal: 1280, max: 1920 },
//             height: { min: 480, ideal: 720, max: 1080 }
//           },
//         },
//         locator: {
//           patchSize: "medium",
//           halfSample: true
//         },
//         decoder: {
//           readers: [
//             "ean_reader", 
//             "ean_8_reader", 
//             "code_128_reader", 
//             "code_39_reader",
//             "upc_reader",
//             "upc_e_reader"
//           ]
//         },
//         locate: true,
//         frequency: 10 // Reduce frequency to prevent over-scanning
//       });

//       await Quagga.start();
//       isInitialized.current = true;
//       setIsScanning(true);
//       setStatus({ message: 'Scanner ready - Point camera at barcode', type: 'success' });
      
//     } catch (error) {
//       console.error('Scanner initialization error:', error);
      
//       let errorMessage = 'Failed to initialize scanner';
//       if (error.name === 'NotAllowedError') {
//         errorMessage = 'Camera permission denied. Please allow camera access and try again.';
//       } else if (error.name === 'NotFoundError') {
//         errorMessage = 'No camera found. Please check your device camera.';
//       } else if (error.name === 'NotReadableError') {
//         errorMessage = 'Camera is busy or unavailable. Please close other apps using camera.';
//       } else if (error.name === 'OverconstrainedError') {
//         errorMessage = 'Camera constraints not supported. Trying with different settings...';
//         // Retry with lower constraints
//         setTimeout(() => initializeScannerLowRes(), 1000);
//         return;
//       }
      
//       setError(errorMessage);
//     } finally {
//       setIsInitializing(false);
//     }
//   }, [cleanup]);

//   // Fallback initialization with lower resolution
//   const initializeScannerLowRes = useCallback(async () => {
//     try {
//       cleanup();
      
//       await Quagga.init({
//         inputStream: {
//           name: "Live",
//           type: "LiveStream",
//           target: scannerRef.current,
//           constraints: {
//             facingMode: "environment",
//             width: { ideal: 640 },
//             height: { ideal: 480 }
//           },
//         },
//         decoder: {
//           readers: ["ean_reader", "code_128_reader", "upc_reader"]
//         },
//         frequency: 5
//       });

//       await Quagga.start();
//       isInitialized.current = true;
//       setIsScanning(true);
//       setStatus({ message: 'Scanner ready (low resolution mode)', type: 'success' });
//       setError(null);
//     } catch (error) {
//       setError('Scanner initialization failed completely');
//     }
//   }, [cleanup]);

//   // Validate barcode with better logic
//   const validateBarcode = useCallback((barcode) => {
//     if (!barcode || typeof barcode !== 'string') return false;
    
//     // Remove any whitespace
//     barcode = barcode.trim();
    
//     // Check if it's numeric (for most standard barcodes)
//     if (!/^\d+$/.test(barcode)) {
//       // Allow alphanumeric for Code 128
//       if (!/^[A-Za-z0-9]+$/.test(barcode)) return false;
//     }
    
//     // Check length (most barcodes are between 8-14 digits)
//     if (barcode.length < 4 || barcode.length > 20) return false;
    
//     return true;
//   }, []);

//   // Handle scan with debouncing
//   const handleScan = useCallback((result) => {
//     const now = Date.now();
//     const barcode = result.codeResult.code;
    
//     // Debounce - prevent multiple scans of same barcode within 2 seconds
//     if (lastScan === barcode && now - lastScanTime.current < 2000) {
//       return;
//     }

//     // Clear any existing timeout
//     if (scanDebounceTimeout.current) {
//       clearTimeout(scanDebounceTimeout.current);
//     }

//     // Validate barcode
//     if (!validateBarcode(barcode)) {
//       setStatus({ message: `Invalid barcode: ${barcode}`, type: 'error' });
//       return;
//     }

//     // Update scan tracking
//     setLastScan(barcode);
//     lastScanTime.current = now;
//     setScanCount(prev => prev + 1);
    
//     // Provide immediate feedback
//     setStatus({ message: `Scanned: ${barcode}`, type: 'success' });
    
//     // Debounce the actual scan callback
//     scanDebounceTimeout.current = setTimeout(() => {
//       onScan(barcode);
      
//       // Auto-close after successful scan (optional)
//       setTimeout(() => {
//         if (onClose) onClose();
//       }, 1000);
//     }, 300);

//   }, [lastScan, validateBarcode, onScan, onClose]);

//   // Setup Quagga detection
//   useEffect(() => {
//     if (isInitialized.current) {
//       Quagga.onDetected(handleScan);
      
//       return () => {
//         Quagga.offDetected(handleScan);
//       };
//     }
//   }, [handleScan]);

//   // Initialize on mount
//   useEffect(() => {
//     initializeScanner();
    
//     return cleanup;
//   }, [initializeScanner, cleanup]);

//   // Auto-clear status messages
//   useEffect(() => {
//     if (status.message && status.type !== 'info') {
//       const timer = setTimeout(() => {
//         setStatus({ message: '', type: '' });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [status]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg overflow-hidden max-w-md w-full m-4">
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="text-lg font-semibold text-gray-900">Barcode Scanner</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 p-1"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Scanner Content */}
//         <div className="p-4">
//           {/* Status/Error Display */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
//               <div className="flex items-start">
//                 <div className="text-red-700 text-sm">
//                   {error}
//                 </div>
//               </div>
//             </div>
//           )}

//           {status.message && (
//             <div className={`mb-4 p-3 rounded-md ${
//               status.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
//               status.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
//               'bg-blue-50 border border-blue-200 text-blue-700'
//             }`}>
//               <div className="text-sm font-medium">
//                 {status.message}
//               </div>
//             </div>
//           )}

//           {/* Scanner Viewport */}
//           <div className="relative bg-black rounded-lg overflow-hidden" style={{ height: '300px' }}>
//             <div 
//               ref={scannerRef} 
//               className="w-full h-full"
//               style={{ 
//                 position: 'relative',
//                 width: '100%',
//                 height: '100%'
//               }}
//             />
            
//             {/* Loading Overlay */}
//             {isInitializing && (
//               <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
//                 <div className="text-white text-center">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
//                   <div>Initializing camera...</div>
//                 </div>
//               </div>
//             )}

//             {/* Scan Guide Overlay */}
//             {isScanning && !error && (
//               <div className="absolute inset-0 pointer-events-none">
//                 <div className="absolute inset-0 border-2 border-dashed border-white opacity-50"></div>
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-16 border-2 border-green-400"></div>
//               </div>
//             )}
//           </div>

//           {/* Stats */}
//           {scanCount > 0 && (
//             <div className="mt-2 text-sm text-gray-500 text-center">
//               Scans attempted: {scanCount}
//             </div>
//           )}

//           {/* Control Buttons */}
//           <div className="mt-4 flex justify-center space-x-2">
//             {error && (
//               <button
//                 onClick={initializeScanner}
//                 disabled={isInitializing}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
//               >
//                 <RotateCcw className="mr-2 h-4 w-4" />
//                 {isInitializing ? 'Retrying...' : 'Retry Camera'}
//               </button>
//             )}
            
//             <button
//               onClick={onClose}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
//             >
//               Close Scanner
//             </button>
//           </div>

//           {/* Instructions */}
//           <div className="mt-4 text-xs text-gray-500 text-center">
//             <p>Point your camera at a barcode to scan it.</p>
//             <p>Make sure the barcode is well-lit and in focus.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarcodeScanner;