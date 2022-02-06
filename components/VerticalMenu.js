import * as React from "react";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "../Auth";

export default function VerticalMenu() {
  const { setCurrentUser } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Nuevo grupo</MenuItem>
        <MenuItem onClick={handleClose}>Archivados</MenuItem>
        <MenuItem onClick={handleClose}>Mensajes destacados</MenuItem>
        <MenuItem onClick={handleClose}>Configuración</MenuItem>
        <MenuItem
          onClick={() => {
            signOut(auth);
            setCurrentUser(null);
          }}
        >
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </>
  );
}
