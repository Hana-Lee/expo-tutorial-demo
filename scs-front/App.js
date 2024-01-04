import { StatusBar } from 'expo-status-bar'
import { Alert, StyleSheet, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import ImageViewer from './src/components/ImageViewer'
import Button from './src/components/Button'
import IconButton from './src/components/IconButton'
import CircleButton from './src/components/CircleButton'
import EmojiPicker from './src/components/EmojiPicker'
import EmojiList from './src/components/EmojiList'
import EmojiSticker from './src/components/EmojiSticker'

const PlaceHolderImageSource = require('./src/assets/images/background-image.png')

export default function App() {
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showAppOptions, setShowAppOptions] = useState(false)

  /**
 * 이미지 결과를 처리하는 함수입니다.
 * @param {ImagePickerSuccessResult} result - 이미지 결과 객체
 * 이미지 선택이 취소되지 않은 경우 선택된 이미지를 설정하고 앱 옵션을 표시합니다.
 * 그렇지 않으면 경고 알림을 표시합니다.
 */
  const handleImageResult = (result) => {
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      Alert.alert("사진을 선택 해주세요")
    }
  }

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    handleImageResult(result);
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const onSaveImageAsync = () => {
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeHolderImageSource={PlaceHolderImageSource} selectedImage={selectedImage}/>
        {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/> : null}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon={"refresh"} label={"다시 선택"} onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon={"save-alt"} label={"저장"} onPress={onSaveImageAsync}/>
          </View>
        </View>
      ): (
        <View style={styles.footerContainer}>
          <Button theme={"primary"} label={"사진 선택"} /* @info */ onPress={pickImageAsync} /* @end *//>
          <Button label={"사진 사용"} onPress={() => setShowAppOptions(true)}/>
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
      <StatusBar style="auto"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})