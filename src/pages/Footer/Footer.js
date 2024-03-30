import React from 'react'

const Footer = () => {
    const footerStyle={
        backgroundColor:'#CBF3F0',
        position:'absolute',
        bottom:'0',
        color:'#23302C',
        fontWeight:'bold',
        letterSpacing: '0.5px',
        height:'50px'
    }
  return (
    <footer class="row footer  text-center py-4 w-100" style={footerStyle}>
    <div class="col">
    Copyright&copy; 2024 <span style={{textTransform:'capitalize', color:'#00B987'}}>Maliha Eco bricks</span>
    </div>
  </footer>

  )
}

export default Footer
