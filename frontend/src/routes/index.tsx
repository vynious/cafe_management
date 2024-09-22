import { createFileRoute } from '@tanstack/react-router'
import { Button, Typography, Box, Container, Paper, Grid, Zoom } from '@mui/material'
import { Coffee, People, LocalCafe } from '@mui/icons-material'
import { useState } from 'react'

export const Route = createFileRoute('/')({
    component: CafeManagement,
})

function CafeManagement() {
    const [hover, setHover] = useState<string | null>(null)

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                <Paper elevation={6} sx={{ p: { xs: 3, sm: 4, md: 5 }, borderRadius: 4, width: '100%', maxWidth: 500, background: 'linear-gradient(145deg, #ffffff, #f0f0f0)' }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <LocalCafe sx={{ fontSize: { xs: 48, sm: 60 }, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h3" gutterBottom fontWeight="bold" color="primary.main" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                            Cafe Management
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Streamline your cafe operations with ease
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {['cafes', 'employees'].map((item) => (
                            <Grid item xs={12} key={item}>
                                <Button
                                    variant="contained"
                                    color={item === 'cafes' ? 'primary' : 'secondary'}
                                    href={`/${item}`}
                                    size="large"
                                    startIcon={item === 'cafes' ? <Coffee /> : <People />}
                                    fullWidth
                                    sx={{
                                        py: 1.5,
                                        transition: 'all 0.3s',
                                        transform: hover === item ? 'scale(1.03)' : 'scale(1)',
                                        boxShadow: hover === item ? 8 : 3,
                                    }}
                                    onMouseEnter={() => setHover(item)}
                                    onMouseLeave={() => setHover(null)}
                                >
                                    Manage {item.charAt(0).toUpperCase() + item.slice(1)}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Zoom>
        </Container>
    )
}