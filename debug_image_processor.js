const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

// Debug image processor for LaxCheck
class ImageDebugger {
  constructor() {
    this.model = null;
    this.classNames = [];
  }

  async loadModel() {
    try {
      const modelPath = path.join(process.cwd(), 'model/model.json');
      const metadataPath = path.join(process.cwd(), 'model/metadata.json');
      
      console.log('🔍 Looking for model at:', modelPath);
      console.log('🔍 Model exists:', fs.existsSync(modelPath));
      
      if (!fs.existsSync(modelPath)) {
        console.log('❌ ML model not found');
        return false;
      }

      // Load model
      this.model = await tf.loadLayersModel('file://' + modelPath);
      
      // Load class names from metadata
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        this.classNames = metadata.labels || [];
        console.log('✅ ML model loaded with classes:', this.classNames);
      } else {
        console.log('⚠️ Metadata not found, using default classes');
        this.classNames = ['Unknown'];
      }

      return true;
    } catch (error) {
      console.log('❌ Failed to load ML model:', error.message);
      return false;
    }
  }

  analyzeImageFormat(imagePath) {
    console.log('\n🔍 Analyzing image format for:', imagePath);
    
    if (!fs.existsSync(imagePath)) {
      console.log('❌ File does not exist');
      return false;
    }

    const stats = fs.statSync(imagePath);
    console.log('📊 File size:', stats.size, 'bytes');

    const imageBuffer = fs.readFileSync(imagePath);
    const imageHeader = imageBuffer.subarray(0, 16);
    
    console.log('🔍 File header (hex):', imageHeader.toString('hex'));
    console.log('🔍 File header (ascii):', imageHeader.toString('ascii').replace(/[^\x20-\x7E]/g, '.'));
    
    // Check image format signatures
    const isJPEG = imageHeader[0] === 0xFF && imageHeader[1] === 0xD8;
    const isPNG = imageHeader[0] === 0x89 && imageHeader[1] === 0x50 && imageHeader[2] === 0x4E && imageHeader[3] === 0x47;
    const isGIF = imageHeader.subarray(0, 3).toString() === 'GIF';
    const isBMP = imageHeader[0] === 0x42 && imageHeader[1] === 0x4D;
    const isWebP = imageHeader.subarray(0, 4).toString() === 'RIFF' && imageHeader.subarray(8, 12).toString() === 'WEBP';
    
    console.log('📋 Format detection:');
    console.log('  JPEG:', isJPEG);
    console.log('  PNG:', isPNG);
    console.log('  GIF:', isGIF);
    console.log('  BMP:', isBMP);
    console.log('  WebP:', isWebP);
    
    return { isJPEG, isPNG, isGIF, isBMP, isWebP, imageBuffer };
  }

  async testTensorFlowProcessing(imagePath) {
    console.log('\n🧪 Testing TensorFlow processing for:', imagePath);
    
    try {
      const imageBuffer = fs.readFileSync(imagePath);
      
      // Try TensorFlow decoding
      console.log('🔄 Attempting tf.node.decodeImage...');
      const decodedImage = tf.node.decodeImage(imageBuffer, 3);
      console.log('✅ Successfully decoded image');
      console.log('📐 Image shape:', decodedImage.shape);
      
      // Try resizing
      console.log('🔄 Attempting resize to 224x224...');
      const resized = tf.image.resizeBilinear(decodedImage, [224, 224]);
      console.log('✅ Successfully resized image');
      
      // Try normalization
      console.log('🔄 Attempting normalization...');
      const normalized = resized.div(255.0);
      console.log('✅ Successfully normalized image');
      
      // Try batching
      console.log('🔄 Attempting batching...');
      const batched = normalized.expandDims(0);
      console.log('✅ Successfully batched image');
      console.log('📐 Final tensor shape:', batched.shape);
      
      // Cleanup
      decodedImage.dispose();
      resized.dispose();
      normalized.dispose();
      batched.dispose();
      
      return true;
    } catch (error) {
      console.log('❌ TensorFlow processing failed:', error.message);
      return false;
    }
  }

  async analyzeUploadsDirectory() {
    console.log('\n📁 Analyzing uploads directory...');
    
    const uploadsDir = path.join(process.cwd(), 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      console.log('❌ Uploads directory does not exist');
      return;
    }
    
    const files = fs.readdirSync(uploadsDir);
    console.log('📋 Found', files.length, 'files in uploads directory');
    
    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      console.log('\n📄 Processing file:', file);
      
      // Analyze format
      this.analyzeImageFormat(filePath);
      
      // Test TensorFlow processing
      await this.testTensorFlowProcessing(filePath);
    }
  }

  async runFullDiagnostic() {
    console.log('🚀 Starting LaxCheck Image Processing Diagnostic\n');
    
    // Check model loading
    console.log('🔍 Step 1: Model Loading');
    const modelLoaded = await this.loadModel();
    
    if (!modelLoaded) {
      console.log('❌ Cannot proceed without model');
      return;
    }
    
    // Analyze uploads directory
    console.log('\n🔍 Step 2: Upload Analysis');
    await this.analyzeUploadsDirectory();
    
    console.log('\n✅ Diagnostic complete');
  }
}

// Create and run debugger
const debugger = new ImageDebugger();

// If called directly, run diagnostic
if (require.main === module) {
  debugger.runFullDiagnostic().catch(console.error);
}

module.exports = ImageDebugger;