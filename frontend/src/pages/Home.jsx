import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ImageCard from './ImageCard';
import { Grid2 } from '@mui/material';
import sitar from "../assets/sitar.avif";
import tabla from "../assets/tabla.jpg";
import flute from "../assets/flute.png";
import backgroundImg from "../assets/background.jpg";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <CssBaseline />
      {/* Background Image with Blur Effect */}
      <div 
        className="fixed top-15 left-0 w-full h-full bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />

      {/* Main Content */}
      <Container className="relative flex justify-center items-center min-h-screen">
        <Grid2 container spacing={10} centered>
          <Grid2 item>
            <ImageCard image={sitar} title="Sitar" navigateTo="/sitar" />
          </Grid2>
          <Grid2 item>
            <ImageCard image={flute} title="Flute" navigateTo="/flute" />
          </Grid2>
          <Grid2 item>
            <ImageCard image={tabla} title="Tabla" navigateTo="/tabla" />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
