import { Button as MuiButton } from '@mui/material';

export default function Button({ text, ...props }) {
  return (
    <MuiButton variant="contained" {...props}>
      {text}
    </MuiButton>
  );
}
