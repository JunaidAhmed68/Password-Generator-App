import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const MAX = 16;
const MIN = 8;
const marks = [
  { value: MIN, label: '' },
  { value: MAX, label: '' },
];

export default function CustomMarks({ length, setLength }) {
  const handleChange = (_, newValue) => {
    setLength(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Password Length: {length}
      </Typography>
      <Slider
        marks={marks}
        step={1}
        value={length}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          onClick={() => setLength(MIN)}
          sx={{ cursor: 'pointer' }}
        >
          {MIN} min
        </Typography>
        <Typography
          variant="body2"
          onClick={() => setLength(MAX)}
          sx={{ cursor: 'pointer' }}
        >
          {MAX} max
        </Typography>
      </Box>
    </Box>
  );
}
