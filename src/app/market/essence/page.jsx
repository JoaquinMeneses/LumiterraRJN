"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Grid, Box, Typography, Input, FormControlLabel } from "@mui/material";
import Switch from "@mui/joy/Switch";
import Image from "next/image";


const Page = () => {
  const [data, setData] = useState([]);
  const [gatherData, setDataGather] = useState([]);
  const [combatData, setDataCombat] = useState([]);
  const [farmingData, setDataFarming] = useState([]);
  const [livestockData, setDataLivestock] = useState([]);
  const [box, setBox] = useState(false); // Estado para el Switch 'box'
  const [loading, setLoading] = useState(true);
  const [costEnergy, setCostEnergy] = useState(0); // Nuevo estado para el precio de energía


  async function fetchData() {
    try {
      const res = await axios.get(`${window.location.origin}/api/tableEssence`);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setDataGather(data.filter(item => item.name.includes("Gather")));
      setDataCombat(data.filter(item => item.name.includes("Combat")));
      setDataFarming(data.filter(item => item.name.includes("Planting")));
      setDataLivestock(data.filter(item => item.name.includes("Livestock")));
      if (data[0]?.costEnergy) {
        setCostEnergy(data[0].costEnergy); // Asignar el valor inicial desde los datos
      }
    }
  }, [data]);

  if (loading)
    return (
      <div className="grid w-full flex-grow place-content-center">
        <CircularProgress />
      </div>
    );
  
  return (
    <Box sx={{ padding: 2 }}>
      {/* Input para Costo de Energía */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          marginBottom: 3,
        }}
      >
        {/* Input agregado a la izquierda */}
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Costo de Energía
        </Typography>
        <input
          type="number"
          value={costEnergy}
          onChange={(e) => setCostEnergy(Number(e.target.value))}
          style={{
            width: '200px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        />

        {/* Controles de los switches */}
        <FormControlLabel
          control={
            <Switch
              checked={box}
              onChange={(e) => setBox(e.target.checked)}
              sx={{
                "--Switch-thumb-size": "24px",
                "--Switch-track-height": "16px",
                "--Switch-track-width": "48px",
              }}
            />
          }
          label="Incorporar Precio de la Packaging box a los costos"
          sx={{
            fontSize: "18px",
          }}
        />
      </Box>

      {/* Tablas de datos */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              border: "1px solid #ccc", // Borde gris claro
              borderRadius: "8px", // Bordes redondeados
              padding: 2, // Espaciado interno
              textAlign: "center", // Texto centrado
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Gather
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
                Detalles
              </Typography>
              
              <Box 
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" fontWeight="bold"></Typography>
                <Typography variant="body2" fontWeight="bold">Energia Requerida</Typography>
                <Typography variant="body2" fontWeight="bold">Costo de Energía</Typography>
                <Typography variant="body2" fontWeight="bold">Essencia Anterior + 15 de Energia</Typography>
                <Typography variant="body2" fontWeight="bold">Precio Market / Precio con fee</Typography>
              </Box>

              {gatherData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 2,
                    marginTop: 1,
                    alignItems: 'center',
                    borderTop: '1px solid #ccc', // Borde superior
                    paddingY: 1, // Espaciado vertical dentro de la caja
                  }}
                >
                  <Box>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Image src={item.img} alt={item.name} width={80} height={80} />
                    </a>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="https://cdn.skymavis.com/mm-cache/7/1/a982febb7e3f7e75d9ff811d644971.png" alt="Energy Icon" width={20} height={20} style={{ marginRight: '8px' }} />
                    <Typography variant="body2">{item.requieredEnergy}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image 
                      src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" 
                      alt="Price Icon" 
                      width={20} 
                      height={20} 
                      style={{ marginRight: '8px' }} 
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body2">
                        {box
                          ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox)).toFixed(2)
                          : Number(costEnergy * item.requieredEnergy).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1)) - (box
                            ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox))
                            : Number(costEnergy * item.requieredEnergy)) > 0
                            ? 'green'
                            : 'red',
                          marginTop: '4px', // Espacio entre los elementos
                        }}
                      >
                        {(
                          Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1) - 
                          (box
                            ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox))
                            : Number(costEnergy * item.requieredEnergy))
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image 
                      src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" 
                      alt="Price Icon" 
                      width={20} 
                      height={20} 
                      style={{ marginRight: '8px' }} 
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body2">
                        {box
                          ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox)).toFixed(2)
                          : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15)).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1)) - (box
                            ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox))
                            : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15))) > 0
                            ? 'green' // Color verde si es positivo
                            : 'red', // Color rojo si es negativo
                          marginTop: '4px', // Espacio entre los elementos
                        }}
                      >
                        {(
                          Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1) - 
                          (box
                            ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox))
                            : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15)))
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" alt="Price Icon" width={20} height={20} style={{ marginRight: '8px' }} />
                    <Typography variant="body2">
                      {item.minPriceUsd}
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1).toFixed(2)}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Combat
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
                Detalles
              </Typography>
              
              <Box 
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" fontWeight="bold"></Typography>
                <Typography variant="body2" fontWeight="bold">Energia Requerida</Typography>
                <Typography variant="body2" fontWeight="bold">Costo de Energía</Typography>
                <Typography variant="body2" fontWeight="bold">Essencia Anterior + 15 de Energia</Typography>
                <Typography variant="body2" fontWeight="bold">Precio Market / Precio con fee</Typography>
              </Box>

              {combatData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 2,
                    marginTop: 1,
                    alignItems: 'center',
                    borderTop: '1px solid #ccc', // Borde superior
                    paddingY: 1, // Espaciado vertical dentro de la caja
                  }}
                >
                  <Box>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Image src={item.img} alt={item.name} width={80} height={80} />
                    </a>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="https://cdn.skymavis.com/mm-cache/7/1/a982febb7e3f7e75d9ff811d644971.png" alt="Energy Icon" width={20} height={20} style={{ marginRight: '8px' }} />
                    <Typography variant="body2">{item.requieredEnergy}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image 
                      src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" 
                      alt="Price Icon" 
                      width={20} 
                      height={20} 
                      style={{ marginRight: '8px' }} 
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body2">
                        {box
                          ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox)).toFixed(2)
                          : Number(costEnergy * item.requieredEnergy).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1)) - (box
                            ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox))
                            : Number(costEnergy * item.requieredEnergy)) > 0
                            ? 'green'
                            : 'red',
                          marginTop: '4px', // Espacio entre los elementos
                        }}
                      >
                        {(
                          Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1) - 
                          (box
                            ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox))
                            : Number(costEnergy * item.requieredEnergy))
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image 
                      src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" 
                      alt="Price Icon" 
                      width={20} 
                      height={20} 
                      style={{ marginRight: '8px' }} 
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body2">
                        {box
                          ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox)).toFixed(2)
                          : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15)).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1)) - (box
                            ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox))
                            : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15))) > 0
                            ? 'green' // Color verde si es positivo
                            : 'red', // Color rojo si es negativo
                          marginTop: '4px', // Espacio entre los elementos
                        }}
                      >
                        {(
                          Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1) - 
                          (box
                            ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox))
                            : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15)))
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" alt="Price Icon" width={20} height={20} style={{ marginRight: '8px' }} />
                    <Typography variant="body2">
                      {item.minPriceUsd}
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1).toFixed(2)}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Farming
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
                Detalles
              </Typography>
              
              <Box 
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" fontWeight="bold"></Typography>
                <Typography variant="body2" fontWeight="bold">Energia Requerida</Typography>
                <Typography variant="body2" fontWeight="bold">Costo de Energía</Typography>
                <Typography variant="body2" fontWeight="bold">Essencia Anterior + 15 de Energia</Typography>
                <Typography variant="body2" fontWeight="bold">Precio Market / Precio con fee</Typography>
              </Box>

              {farmingData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 2,
                    marginTop: 1,
                    alignItems: 'center',
                    borderTop: '1px solid #ccc', // Borde superior
                    paddingY: 1, // Espaciado vertical dentro de la caja
                  }}
                >
                  <Box>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Image src={item.img} alt={item.name} width={80} height={80} />
                    </a>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="https://cdn.skymavis.com/mm-cache/7/1/a982febb7e3f7e75d9ff811d644971.png" alt="Energy Icon" width={20} height={20} style={{ marginRight: '8px' }} />
                    <Typography variant="body2">{item.requieredEnergy}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image 
                      src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" 
                      alt="Price Icon" 
                      width={20} 
                      height={20} 
                      style={{ marginRight: '8px' }} 
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body2">
                        {box
                          ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox)).toFixed(2)
                          : Number(costEnergy * item.requieredEnergy).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1)) - (box
                            ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox))
                            : Number(costEnergy * item.requieredEnergy)) > 0
                            ? 'green'
                            : 'red',
                          marginTop: '4px', // Espacio entre los elementos
                        }}
                      >
                        {(
                          Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1) - 
                          (box
                            ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox))
                            : Number(costEnergy * item.requieredEnergy))
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image 
                      src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" 
                      alt="Price Icon" 
                      width={20} 
                      height={20} 
                      style={{ marginRight: '8px' }} 
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body2">
                        {box
                          ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox)).toFixed(2)
                          : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15)).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1)) - (box
                            ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox))
                            : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15))) > 0
                            ? 'green' // Color verde si es positivo
                            : 'red', // Color rojo si es negativo
                          marginTop: '4px', // Espacio entre los elementos
                        }}
                      >
                        {(
                          Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1) - 
                          (box
                            ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox))
                            : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15)))
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" alt="Price Icon" width={20} height={20} style={{ marginRight: '8px' }} />
                    <Typography variant="body2">
                      {item.minPriceUsd}
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1).toFixed(2)}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Livestock
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
                Detalles
              </Typography>
              
              <Box 
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" fontWeight="bold"></Typography>
                <Typography variant="body2" fontWeight="bold">Energia Requerida</Typography>
                <Typography variant="body2" fontWeight="bold">Costo de Energía</Typography>
                <Typography variant="body2" fontWeight="bold">Essencia Anterior + 15 de Energia</Typography>
                <Typography variant="body2" fontWeight="bold">Precio Market / Precio con fee</Typography>
              </Box>

              {livestockData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 2,
                    marginTop: 1,
                    alignItems: 'center',
                    borderTop: '1px solid #ccc', // Borde superior
                    paddingY: 1, // Espaciado vertical dentro de la caja
                  }}
                >
                  <Box>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Image src={item.img} alt={item.name} width={80} height={80} />
                    </a>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="https://cdn.skymavis.com/mm-cache/7/1/a982febb7e3f7e75d9ff811d644971.png" alt="Energy Icon" width={20} height={20} style={{ marginRight: '8px' }} />
                    <Typography variant="body2">{item.requieredEnergy}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image 
                      src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" 
                      alt="Price Icon" 
                      width={20} 
                      height={20} 
                      style={{ marginRight: '8px' }} 
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body2">
                        {box
                          ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox)).toFixed(2)
                          : Number(costEnergy * item.requieredEnergy).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1)) - (box
                            ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox))
                            : Number(costEnergy * item.requieredEnergy)) > 0
                            ? 'green'
                            : 'red',
                          marginTop: '4px', // Espacio entre los elementos
                        }}
                      >
                        {(
                          Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1) - 
                          (box
                            ? (Number(costEnergy * item.requieredEnergy) + Number(item.minPriceBox))
                            : Number(costEnergy * item.requieredEnergy))
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image 
                      src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" 
                      alt="Price Icon" 
                      width={20} 
                      height={20} 
                      style={{ marginRight: '8px' }} 
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="body2">
                        {box
                          ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox)).toFixed(2)
                          : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15)).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1)) - (box
                            ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox))
                            : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15))) > 0
                            ? 'green' // Color verde si es positivo
                            : 'red', // Color rojo si es negativo
                          marginTop: '4px', // Espacio entre los elementos
                        }}
                      >
                        {(
                          Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1) - 
                          (box
                            ? (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15) + Number(item.minPriceBox))
                            : (Number(item.minPriceUsdBelowEssence * 2) + Number(costEnergy * 15)))
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png" alt="Price Icon" width={20} height={20} style={{ marginRight: '8px' }} />
                    <Typography variant="body2">
                      {item.minPriceUsd}
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {Number(Number(item.minPriceUsd) - Number(item.minPriceUsd) * 0.1).toFixed(2)}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;