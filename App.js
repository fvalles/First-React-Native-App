import React from 'react';
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'
import styled from 'styled-components'
import Button from './src/components/Button'

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    //console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri })
  }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }

  let clearSelectedImg = () => {
    setSelectedImage(null);
  }

  if (selectedImage !== null) {
    return (
      <StyledView>
        <StyledThumbnail source={{ uri: selectedImage.localUri }} />
        <Button onPress={openShareDialogAsync} text='Share this photo' />
        <Button onPress={clearSelectedImg} text='Go back' marginTop />
      </StyledView>
    )
  }
  
  return (
    <StyledView>
      <StyledImage source={{ uri: "https://i.imgur.com/TkIrScD.png" }} />
      <StyledText>
        To share a photo from your phone with a friend, just press the button below!
      </StyledText>
      <Button onPress={openImagePickerAsync} text='Pick a photo' />
    </StyledView>
  );
}

const StyledView = styled.View`
    flex: 1;
    background-color: #FFF;
    align-items: center;
    justify-content: center;
`

const StyledImage = styled.Image`
    width: 305px;
    height: 159px;
    margin-bottom: 20px;
`

const StyledText = styled.Text`
    color: #888;
    font-size: 18px;
    margin: 0 15px 10px;
`

const StyledThumbnail = styled.Image`
  width: 300px;
  height: 300px;
  resize-mode: contain;
`
