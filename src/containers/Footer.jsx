import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



export default function Footer() {
    return (
        <AppBar position="static" color="primary" style={{ background: '#2E3B55', margin:'0 auto',padding:'1em' }} >
          <Container maxWidth="md" >
            <Toolbar>
              <Typography variant="body1" color="inherit" >
                    Esta es una OMDB page, creada para Plataforma 5
                      © Todos los derechos reservados - Augusto Morales 2021 
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}
  

