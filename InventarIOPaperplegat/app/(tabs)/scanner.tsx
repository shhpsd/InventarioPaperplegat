import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Camera, CameraType, BarcodeScanningResult } from 'expo-camera';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  name: string;
  price: string;
};

const Scanner = () => {
  const [barcode, setBarcode] = useState('');
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState('back');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setBarcode(data); // Guarda el código de barras escaneado
  };

  const onSubmit = (data: FormData) => {
    // Aquí va tu lógica de "push", como una llamada a la API
    Alert.alert('Formulario enviado', `Código: ${barcode}\nNombre: ${data.name}\nPrecio: ${data.price}`);
    reset(); // Limpiar el formulario después de enviarlo
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para usar la cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se ha concedido permiso para usar la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Cámara para escanear el código de barras */}
      <Camera
        style={styles.camera}
        type={cameraType}
        onBarCodeScanned={handleBarCodeScanned}
      >
        <View style={styles.cameraOverlay}>
          <Text style={styles.cameraText}>Escanea un código de barras</Text>
        </View>
      </Camera>

      {/* Mostrar el código de barras escaneado */}
      {barcode ? (
        <View style={styles.barcodeContainer}>
          <Text style={styles.barcodeText}>Código escaneado: {barcode}</Text>
        </View>
      ) : null}

      {/* Formulario */}
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="name"
          defaultValue=""
          rules={{ required: 'El nombre es obligatorio' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nombre del producto"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="price"
          defaultValue=""
          rules={{ required: 'El precio es obligatorio' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Precio del producto"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
        />

        <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: 300,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    fontSize: 20,
    color: 'white',
  },
  barcodeContainer: {
    marginTop: 20,
  },
  barcodeText: {
    fontSize: 18,
  },
  formContainer: {
    marginTop: 40,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default Scanner;