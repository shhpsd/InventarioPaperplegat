import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  name: string;
  price: string;
};

const Scanner = () => {
  const [barcode, setBarcode] = useState('');
  const { control, handleSubmit, reset } = useForm<FormData>();

  const handleBarCodeScanned = (event: BarCodeReadEvent) => {
    setBarcode(event.data); // Guarda el código de barras escaneado
  };

  const onSubmit = (data: FormData) => {
    // Aquí va tu lógica de "push", como una llamada a la API
    Alert.alert('Formulario enviado', `Código: ${barcode}\nNombre: ${data.name}\nPrecio: ${data.price}`);
    reset(); // Limpiar el formulario después de enviarlo
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Cámara para escanear el código de barras */}
      <RNCamera
        style={{ width: '100%', height: 300 }}
        onBarCodeRead={handleBarCodeScanned}
        captureAudio={false}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>
            Escanea un código de barras
          </Text>
        </View>
      </RNCamera>

      {/* Mostrar el código de barras escaneado */}
      {barcode ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>
            Código escaneado: {barcode}
          </Text>
        </View>
      ) : null}

      {/* Formulario */}
      <View style={{ marginTop: 40, width: '80%' }}>
        <Controller
          control={control}
          name="name"
          defaultValue=""
          rules={{ required: 'El nombre es obligatorio' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                borderWidth: 1,
                padding: 10,
                marginBottom: 10,
                borderColor: 'gray',
                borderRadius: 5,
              }}
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
              style={{
                borderWidth: 1,
                padding: 10,
                marginBottom: 10,
                borderColor: 'gray',
                borderRadius: 5,
              }}
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

export default Scanner;