import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import {
  Button,
  Box,
  Slider,
  Typography,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { CloudUpload, Crop, Delete } from '@mui/icons-material';

const ImageCrop = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!imageSrc || !croppedAreaPixels) return;
    
    alert('Изображение обрезано! (В реальном приложении здесь будет сохранение)');
  };

  const handleClear = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Обрезка изображения блюда
        </Typography>
        
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-image"
          type="file"
          onChange={handleFileChange}
        />
        
        <label htmlFor="upload-image">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            sx={{ mb: 2 }}
          >
            Загрузить изображение
          </Button>
        </label>
        
        {imageSrc && (
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Перетащите изображение для обрезки
            </Typography>
            
            <Box sx={{ position: 'relative', height: 400, width: '100%', bgcolor: 'grey.900' }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
            
            <Box sx={{ mt: 2, px: 2 }}>
              <Typography gutterBottom>Масштаб</Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e, value) => setZoom(value)}
              />
            </Box>
          </Box>
        )}
      </CardContent>
      
      {imageSrc && (
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Crop />}
            onClick={handleCrop}
          >
            Обрезать изображение
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleClear}
          >
            Удалить
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ImageCrop;