import React from 'react'
import reactCSS, { handleHover } from 'reactcss'
import map from 'lodash/map'

import { ColorWrap, Swatch } from 'react-color/lib/components/common'

const GithubSwatch = ({ hover, color, onClick, onSwatchHover }) => {
  const hoverSwatch = {
    position: 'relative',
    zIndex: '2',
    outline: '2px solid #fff',
    boxShadow: '0 0 5px 2px rgba(0,0,0,0.25)',
  }

  const styles = reactCSS({
    'default': {
      swatch: {
        width: '17px',
        height: '17px',
      },
    },
    'hover': {
      swatch: hoverSwatch,
    },
  }, { hover })

  return (
    <div style={ styles.swatch }>
      <Swatch color={ color } onClick={ onClick } onHover={ onSwatchHover } focusStyle={ hoverSwatch } />
    </div>
  )
}

export const ColorPicker = ({ width, colors, onChange, onSwatchHover, triangle }) => {
  const styles = reactCSS({
    'default': {
      card: {
        width,
        position: 'relative',
        padding: '5px',
        display: 'flex',
        flexWrap: 'wrap',
      },
      triangle: {
        position: 'absolute',
        border: '7px solid transparent',
        borderBottomColor: '#fff',
      },
      triangleShadow: {
        position: 'absolute',
        border: '8px solid transparent',
        borderBottomColor: 'rgba(0,0,0,0.15)',
      },
    },
    'hide-triangle': {
      triangle: {
        display: 'none',
      },
      triangleShadow: {
        display: 'none',
      },
    },
    'top-left-triangle': {
      triangle: {
        top: '-14px',
        left: '10px',
      },
      triangleShadow: {
        top: '-16px',
        left: '9px',
      },
    },
    'top-right-triangle': {
      triangle: {
        top: '-14px',
        right: '10px',
      },
      triangleShadow: {
        top: '-16px',
        right: '9px',
      },
    },
    'bottom-right-triangle': {
      triangle: {
        top: '35px',
        right: '10px',
        transform: 'rotate(180deg)',
      },
      triangleShadow: {
        top: '37px',
        right: '9px',
        transform: 'rotate(180deg)',
      },
    },
  }, {
    'hide-triangle': triangle === 'hide',
    'top-left-triangle': triangle === 'top-left',
    'top-right-triangle': triangle === 'top-right',
    'bottom-right-triangle': triangle === 'bottom-right',
  })

  const handleChange = (hex, e) => onChange({ hex, source: 'hex' }, e)

  return (
    <div style={ styles.card } className="github-picker">
      <div style={ styles.triangleShadow } />
      <div style={ styles.triangle } />
      { map(colors, (c) => (
        <GithubSwatch color={ c } key={ c } onClick={ handleChange } onSwatchHover={ onSwatchHover } />
      )) }
    </div>
  )
}

ColorPicker.defaultProps = {
  width: '200px',
  colors: ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
           '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'],
  triangle: 'top-left',
}

export default ColorWrap(ColorPicker)
