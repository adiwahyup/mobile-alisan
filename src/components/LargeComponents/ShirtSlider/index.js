import React, { Component } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SliderBox } from 'react-native-image-slider-box';
import { responsiveHeight, responsiveWidth, colors } from '../../../utils';

export default class ShirtSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openImage: false,
      previewImage: false,
    };
  }

  clickPreview = index => {
    this.setState({
      openImage: true,
      previewImage: [
        {
          url: '',
          props: {
            // Or you can set source directory.
            source: this.props.images[index],
          },
        },
      ],
    });
  };
  render() {
    const { images } = this.props;
    const { openImage, previewImage } = this.state;
    return (
      <View>
        <SliderBox
          images={images}
          circleLoop
          sliderBoxHeight={responsiveHeight(420)}
          ImageComponentStyle={styles.item}
          dotStyle={styles.dotStyle}
          dotColor={colors.primary}
          imageLoadingColor={colors.primary}
          onCurrentImagePressed={index => this.clickPreview(index)}
        />
        <Modal visible={openImage} transparent={true}>
          <ImageViewer
            imageUrls={previewImage}
            backgroundColor={colors.primary}
            onClick={() => this.setState({ openImage: false })}
            enableSwipeDown
            onSwipeDown={() => this.setState({ openImage: false })}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    width: responsiveWidth(344),
  },
  dotStyle: {
    marginTop: -30,
  },
});
