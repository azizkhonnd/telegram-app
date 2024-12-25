import Image from 'next/image'
import PremiumImg from './img/premium-img.png'

const PremiumComponent = () => {
  return (
    <div>
      <Image 
        src={PremiumImg} 
        alt="Premium" 
        width={25}
        height={25}
      />
    </div>
  )
}

export default PremiumComponent;
