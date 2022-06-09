import React, {useState, useEffect} from 'react';
import {Avatar, Menu, MenuItem, Button, Divider, ListItemIcon, ListItemText, Badge} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {Logout} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {styled} from '@mui/material/styles';

interface Props {
  userName: string;
}

const NavAvatar: React.FC<Props> = ({userName}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const colorOnLive: string = '#44b700';
  const colorOffLive: string = '#cc0c00';
  const [colorLive, setColorLive] = useState<string>(colorOnLive);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function stringAvatar() {
    return {
      sx: {
        bgcolor: 'primary.light',
        fontSize: '120%',
      },
      children: `${userName.split(' ')[0][0]}${userName.split(' ')[1][0]}`,
    };
  }

  // useEffect(() => {
  //   //Redirects to login after localStorage is not found
  //   if (localStorage.getItem('_loggedIn_') !== 'true') {
  //     setColorLive(colorOffLive);
  //     setTimeout(function () {
  //       navigate('/');
  //     }, 5000);
  //   }
  // }, []);

  const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
      backgroundColor: `${colorLive}`,
      color: `${colorLive}`,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const logoutButton = () => {
    let login: any = localStorage.getItem('_loggedIn_');
    if (login === 'true') {
      localStorage.removeItem('_loggedIn_');
    }
    navigate('/');
    document.location.reload();
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div style={{marginLeft: 'auto'}}>
      <Button
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          variant="dot">
          <Avatar {...stringAvatar()} />
        </StyledBadge>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          onClick={() => {
            goToProfile();
            handleClose();
          }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mi perfil</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logoutButton();
            handleClose();
          }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavAvatar;
