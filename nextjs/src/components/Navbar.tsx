import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <StoreIcon />
        <Box width={8} />
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          Fincycle
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
