import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { memo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import honda from '@/assets/image/honda.png'
import logo_honda from '@/assets/image/logo-honda.png'
import suzuki from '@/assets/image/suzuki.png'
import logo_suzuki from '@/assets/image/logo-suzuki.png'
import yamaha from '@/assets/image/yamaha.png'
import logo_yamaha from '@/assets/image/logo-yamaha.png'

const motors = [
  {
    name: 'HonDa',
    icon: logo_honda,
    image: honda,
  },
  {
    name: 'Suzuki',
    icon: logo_suzuki,
    image: suzuki,
  },
  {
    name: 'Yamka',
    icon: logo_yamaha,
    image: yamaha,
  },
  {
    name: 'Scoopy',
    icon: logo_honda,
    image: honda,
  },
]

const ComponentToPrint = memo(() => (
  <div className='px-6'>
    <div className='flex justify-around'>
      {motors.map(({ name, icon, image }, index) => (
        <div key={index} className=''>
          <div className='flex'>
            <img src={icon} alt={icon} className='w-24 h-10' />
            <h2>{name}</h2>
          </div>
          <img src={image} alt={image} className='w-40 h-40' />
        </div>
      ))}
    </div>
    <div>
      <p>THang luk Motor Ki Han</p>
      <p>Best regards,</p>
      <p>John Doe</p>
      <p>Customer Service</p>
    </div>

  </div>
));

const Invoice = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <Label className="text-lg">Invoice</Label>
        <Button variant="destructive" onClick={handlePrint}>Print</Button>
      </CardHeader>
      <CardContent>
        <div style={{ border: 'solid' }}>
          <div ref={componentRef}>
            <ComponentToPrint />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Invoice
